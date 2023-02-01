const request = require('supertest')
const { render } = require('../../test-utils')

require('@testing-library/jest-dom')

const server = require('../server')
const lib = require('../lib')

jest.mock('./lib', () => ({
  getPuppyData: jest.fn(),
  getPuppyById: jest.fn(),
  addNewPuppy: jest.fn(),
  editPuppy: jest.fn(),
}))

const mockPuppies = {
  puppies: [
    { id: 1, name: 'Fido', owner: 'Fred', image: '1.jpg', breed: 'Lab' },
    { id: 2, name: 'Coco', owner: 'Chloe', image: '2.jpg', breed: 'Pug' },
  ],
}

describe('GET /', () => {
  it('renders a list of puppies', () => {
    lib.getPuppyData.mockImplementation((callback) => {
      callback(null, mockPuppies)
    })

    return request(server)
      .get('/')
      .expect(200)
      .then((res) => {
        const screen = render(res)
        const puppyLinks = screen.getAllByRole('link')
        expect(puppyLinks).toHaveLength(4)
      })
  })

  it('returns a 500 with the correct error message', () => {
    lib.getPuppyData.mockImplementation((callback) => {
      callback(new Error('test error message'))
    })

    return request(server)
      .get('/')
      .expect(500)
      .then((res) => {
        const screen = render(res)
        const msg = screen.getByText('test error message')

        expect(msg).toBeInTheDocument()
      })
  })
})

describe('GET /:id', () => {
  it('renders puppy details', () => {
    lib.getPuppyById.mockImplementation((id, callback) => {
      expect(id).toBe(2)
      callback(null, mockPuppies.puppies[1])
    })

    return request(server)
      .get('/2')
      .expect(200)
      .then((res) => {
        const screen = render(res)

        const img = screen.getByAltText('Coco')
        expect(img.src).toMatch(/\.jpg/)
        const heading = screen.getByRole('heading', { name: 'Coco' })
        expect(heading).toBeInTheDocument()
      })
  })

  it('returns a 404 if the id is not found', () => {
    lib.getPuppyById.mockImplementation((id, callback) => {
      const error = new Error('test not found error')
      error.code = 404
      callback(error)
    })

    return request(server)
      .get('/9999')
      .expect(404)
      .then((res) => {
        expect(res.text).toMatch('Not Found')
      })
  })

  it('returns a 500 with the correct error message', () => {
    lib.getPuppyById.mockImplementation((id, callback) => {
      callback(new Error('test error message'))
    })

    // keep the error message from lib.js out of the test run

    return request(server)
      .get('/1')
      .expect(500)
      .then((res) => {
        expect(res.text).toMatch('test error message')
      })
  })
})

describe('POST /edit/:id', () => {
  it('receives puppy details and redirects to detail', () => {
    expect.assertions(6)

    lib.editPuppy.mockImplementation((pup, callback) => {
      const { id, name, owner, breed, image } = pup
      expect(id).toBe(2)
      expect(name).toBe('test name')
      expect(owner).toBe('test owner')
      expect(breed).toBe('test breed')
      expect(image).toBe('test.jpg')
      callback()
    })

    const updatedPuppy = {
      id: 2,
      name: 'test name',
      owner: 'test owner',
      breed: 'test breed',
      image: 'test.jpg',
    }

    return request(server)
      .post('/edit/2')
      .send(updatedPuppy)
      .set({ 'Content-Type': 'application/x-www-form-urlencoded' })
      .expect(302)
      .then((res) => {
        expect(res.header.location).toBe('/2')
      })
  })

  it('returns a 404 if the id is not found', () => {
    lib.editPuppy.mockImplementation((pup, callback) => {
      const error = new Error('test not found error')
      error.code = 404
      callback(error)
    })

    const updatedPuppy = {}

    return request(server)
      .post('/edit/9999')
      .send(updatedPuppy)
      .set({ 'Content-Type': 'application/x-www-form-urlencoded' })
      .expect(404)
      .then((res) => {
        expect(res.text).toMatch('Not Found')
      })
  })

  it('returns a 500 with the correct error message', () => {
    lib.editPuppy.mockImplementation((pup, callback) => {
      callback(new Error('test error message'))
    })

    // keep the error message from lib.js out of the test run
    const updatedPuppy = {}

    return request(server)
      .post('/edit/1')
      .send(updatedPuppy)
      .set({ 'Content-Type': 'application/x-www-form-urlencoded' })
      .expect(500)
      .then((res) => {
        expect(res.text).toMatch('test error message')
      })
  })
})

describe('POST /new', () => {
  it('receives the new puppy and redirects to detail', () => {
    expect.assertions(2)

    lib.addNewPuppy.mockImplementation((pup, callback) => {
      expect(pup.id).toBeUndefined()
      callback(null, 3)
    })

    const newPuppy = {
      name: 'test name',
      owner: 'test owner',
      breed: 'test breed',
      image: 'test.jpg',
    }

    return request(server)
      .post('/new')
      .send(newPuppy)
      .set({ 'Content-Type': 'application/x-www-form-urlencoded' })
      .expect(302)
      .then((res) => {
        expect(res.header.location).toBe('/3')
      })
  })

  it('returns a 500 with the correct error message', () => {
    lib.addNewPuppy.mockImplementation((pup, callback) => {
      callback(new Error('test error message'))
    })

    // keep the error message from lib.js out of the test run

    return request(server)
      .post('/new')
      .send({})
      .set({ 'Content-Type': 'application/x-www-form-urlencoded' })
      .expect(500)
      .then((res) => {
        expect(res.text).toMatch('test error message')
      })
  })
})
