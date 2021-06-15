import { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Box } from "@material-ui/core";

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy
  );
  //localStorage.clear()
  const ratingsData = JSON.parse(localStorage.getItem("ratings"));
  const [filterInput, setFilterInput] = useState("");
  const [ratings, setRating] = useState(ratingsData || []);
  const stars = Array(1).fill(0);

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("language", value);
    setFilterInput(value);
  };

  return (
    <div>
      <form>
        <tr>
          <td>Language Filter: </td>
          <td>
            <input
              value={filterInput}
              onChange={handleFilterChange}
              placeholder={"Filter by Programming Language"}
              id="myInput"
              type="text"
            />
          </td>
        </tr>
      </form>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </th>
              ))}
              <th>Vote for your Favorite!</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <td>
                  {stars.map((_, index) => {
                    return (
                      <Box
                        component="fieldset"
                        mb={3}
                        borderColor="transparent"
                      >
                        <Rating
                          precision={0.5}
                          emptyIcon={<StarBorderIcon fontSize="inherit" />}
                          onChange={(_, value) => {
                            const obj = { id: row.values.id, value: value };
                            setRating((ratings) => [...ratings, obj]);
                            localStorage.setItem(
                              "ratings",
                              JSON.stringify(ratings)
                            );
                          }}
                        />
                      </Box>
                    );
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const TableRepos = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Repo Name",
        accessor: "full_name",
      },
      {
        Header: "Repo URL",
        accessor: "html_url",
      },
      {
        Header: "Language",
        accessor: "language",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Owner",
        accessor: "owner.login",
      },
      {
        Header: "Number of Stars!",
        accessor: "stargazers_count",
      },
      {
        accessor: "id",
      },
    ],
    []
  );

  const [hasError, setErrors] = useState(false);
  const [repos, setRepos] = useState([]);

  const data = async function fetchData() {
    const res = await fetch(
      "https://api.github.com/search/repositories?q=created:%3E2021-06-07&sort=stars&order=desc"
    );
    res
      .json()
      .then((res) => setRepos(res.items))
      .catch((err) => setErrors(err));
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div>
      <Table columns={columns} data={repos} />
    </div>
  );
};

export default TableRepos;
