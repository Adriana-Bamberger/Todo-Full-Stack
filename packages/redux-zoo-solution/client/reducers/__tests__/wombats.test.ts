import { describe, it, expect, vi } from 'vitest'
import wombatReducer from '../wombats'
import { addWombat, deleteWombat, updateWombat } from '../../actions'

const initialState = ['Gertrude', 'Bartholemew']

describe('wombatReducer', () => {
  it('should return the initial state', () => {
    const state = wombatReducer(undefined, { type: '@@INIT' } as any)
    expect(state).toEqual(initialState)
  })

  it('adds a wombat to redux state', () => {
    const action = addWombat('Wanda')

    const newState = wombatReducer(initialState, action)

    expect(newState).toHaveLength(3)
    expect(newState).toEqual(['Gertrude', 'Bartholemew', 'Wanda'])
  })

  it('deletes a wombat from redux state', () => {
    const action = deleteWombat('Bartholemew')

    const newState = wombatReducer(initialState, action)

    expect(newState).toHaveLength(1)
    expect(newState).not.toContain('Bartholemew')
  })

  it('updates a wombat in redux state', () => {
    const action = updateWombat('Bartholemew', 'Wanda')

    const newState = wombatReducer(initialState, action)

    expect(newState).toHaveLength(2)
    expect(newState).not.toContain('Bartholemew')
    expect(newState).toEqual(['Gertrude', 'Wanda'])
  })
})
