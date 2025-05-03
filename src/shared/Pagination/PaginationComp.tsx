import { Pagination, Stack, } from '@mui/material'
import React from 'react'
import { PaginationCompProps } from '../../Interfaces/props.interface';

export default function PaginationComp({
  count,
  page,
  setPage,
  size,
}: PaginationCompProps) {
  // Pagination handlers
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  // Calculate total pages, making sure to round up
  const totalPages = Math.floor(count / size);

  return (
    <>
      <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
        <Pagination  color='primary'  count={totalPages} page={page} onChange={handleChange} />
      </Stack>
    </>
  )
}