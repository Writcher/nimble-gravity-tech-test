import { TableCell, TableHead, TableRow } from '@mui/material';

export const Encabezado = () => (
    <TableHead>
        <TableRow>
            <TableCell align='left' width='30%'>
                <div className='text-gray-700 font-bold'>
                    Posición
                </div>
            </TableCell>
            <TableCell align='center' colSpan={2} width='70%'>
                <div className='text-gray-700 font-bold'>
                    Formulario
                </div>
            </TableCell>
        </TableRow>
    </TableHead>
); 