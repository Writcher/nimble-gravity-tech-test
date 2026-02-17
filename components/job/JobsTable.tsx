import { getJobList } from '@/services/job.service';
import { CandidateData } from '@/types/candidate.types';
import { Snackbar, Table, TableBody, TableContainer } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Encabezado } from './JobsTableHeader';
import { Esqueleto } from './JobsTableSkeleton';
import { Job } from '@/types/job.types';
import { Fila } from './JobsTableRow';
import { useEffect, useState } from 'react';

interface JobsTableProps {
    candidate: CandidateData
};

export function JobsTable({ candidate }: JobsTableProps) {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['jobs'],
        queryFn: () => getJobList(),
        refetchOnWindowFocus: false
    });

    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({
        open: false,
        message: '',
        severity: 'success'
    });

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbar({ open: true, message, severity });
    };

    useEffect(() => {
        if (isError) {
            showSnackbar(
                error instanceof Error ? error.message : 'Error al buscar puestos',
                'error'
            );
        }
    }, [isError]);

    return (
        <>
            <div className='flex flex-col justify-between w-full h-full overflow-y-auto'>
                {isLoading || (data && data.length > 0) ? (
                    <TableContainer>
                        <Table stickyHeader>
                            <Encabezado />
                            {isLoading ? (
                                <Esqueleto />
                            ) : (
                                <TableBody>
                                    {data?.map((job: Job) => (
                                        <Fila candidate={candidate} job={job} key={job.id} onResult={showSnackbar} />
                                    ))}
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                ) : null}
                {!isLoading && (!data || data.length === 0) && (
                    <div className='flex items-center justify-center h-full w-full text-gray-700 font-medium]'>
                        No se encontraron puestos
                    </div>
                )}
            </div>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar(s => ({ ...s, open: false }))}
                message={snackbar.message}
            />
        </>
    )
};