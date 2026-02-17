import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';

export const Esqueleto = () => (
    <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
                <TableCell align='left' width='30%'>
                    <div className='flex items-center justify-start'>
                        <Skeleton variant='text' width={150} />
                    </div>
                </TableCell>
                <TableCell align='center'>
                    <div className='flex items-center justify-center'>
                        <Skeleton variant='rectangular' className='!rounded' width={250} height={40} />
                    </div>
                </TableCell>
                <TableCell align='right'>
                    <div className='flex items-center justify-end'>
                        <Skeleton variant='rectangular' className='!rounded' width={60} height={30} />
                    </div>
                </TableCell>
            </TableRow>
        ))}
    </TableBody>
);