interface Props {
  page: number;
  setSearchParams: (params: (prevParams: URLSearchParams) => URLSearchParams) => void;
}

function Pagination({ page, setSearchParams }: Props) {
  return (
    <div className="flex justify-center gap-5 mb-10">
      <button
        disabled={page < 1 == true}
        onClick={() =>
          setSearchParams((params) => {
            params.set("page", page - 1 + "");
            return params;
          })
        }
      >
        Previous
      </button>
      <button
        onClick={() =>
          setSearchParams((params) => {
            params.set("page", page + 1 + "");
            return params;
          })
        }
      >
        Next
      </button>
    </div>
  );
}
export default Pagination;
