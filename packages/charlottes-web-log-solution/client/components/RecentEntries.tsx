import entriesData from '../data/recent-entries'
import RecentEntry from './RecentEntry'

export default function RecentEntries() {
  return (
    <div className="recent-entries">
      <header>Recent Entries</header>
      <ul>
        {entriesData.map((entry) => {
          return (
            <RecentEntry key={entry.id} name={entry.name} link={entry.link} />
          )
        })}
      </ul>
    </div>
  )
}
