interface Props {
  page: number;
  setSearchParams: (params: (prevParams: URLSearchParams) => URLSearchParams) => void;
  isLastPage: boolean;
}

function Pagination({ page, setSearchParams, isLastPage }: Props) {
  return (
    <div className="flex justify-center gap-5">
      <button
        disabled={page <= 1 === true}
        className="disabled:opacity-25"
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
        className="disabled:opacity-25"
        disabled={isLastPage}
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
