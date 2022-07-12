import React, { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';

type IProps = {
  totalPages: number;
};

const Pagination: FC<IProps> = ({ totalPages }) => {
  const { query, push } = useRouter();
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 10;

  const items = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, items, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;

    push({ query: { ...query, page: event.selected + 1 } });
    setItemOffset(newOffset);
  };

  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        containerClassName="flex space-x-4 items-center justify-center"
        pageClassName="border border-primary rounded-lg px-4 py-2"
        activeClassName="bg-primary text-white"
        previousClassName="border border-primary text-primary font-bold rounded-lg px-4 py-2 hover:bg-primary hover:text-white"
        nextClassName="border border-primary text-primary font-bold rounded-lg px-4 py-2 hover:bg-primary hover:text-white"
      />
    </div>
  );
};

export default Pagination;
