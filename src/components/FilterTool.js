import {setFilter} from './components/TableRepos'

const FilterTool = () => {
  return (
    <div>
      <form>
      <tr>
        <td>Language Filter: </td>
        <td>
        <input
          placeholder="language"
          onChange={(e) => setFilter("language", e.target.value)}
        />
        </td>
      </tr>
      </form>
    </div>
  )
}

export default FilterTool