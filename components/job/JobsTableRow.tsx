import { applyToJob } from '@/services/candidate.service';
import { ApplyToJobParams, CandidateData } from '@/types/candidate.types';
import { Job } from '@/types/job.types';
import { Button, Snackbar, TableCell, TableRow, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import SyncIcon from '@mui/icons-material/Sync';

interface FilaProps {
    candidate: CandidateData,
    job: Job,
    onResult: (message: string, severity: 'success' | 'error') => void
};

interface FilaFormData {
    url: string
};

export function Fila({ candidate, job, onResult }: FilaProps) {
    const { control, handleSubmit, formState: { isValid }, reset } = useForm<FilaFormData>();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: ApplyToJobParams) => applyToJob(data),
        onSuccess: () => {
            onResult('Aplicación enviada correctamente', 'success');
            reset();
        },
        onError: (error: unknown) => {
            onResult(
                error instanceof Error ? error.message : 'Error al enviar aplicación',
                'error'
            );
        }
    });

    const onSubmit = (data: FilaFormData) => {
        mutate({
            uuid: candidate.uuid,
            jobId: job.id,
            candidateId: candidate.candidateId,
            repoUrl: data.url
        });
    };

    return (
        <>
            <TableRow>
                <TableCell align='left' width='30%'>
                    <div className='text-gray-700 font-medium text-sm'>
                        {job.title}
                    </div>
                </TableCell>
                <TableCell align='center'>
                    <div className='text-gray-700 font-medium text-sm' style={{ userSelect: 'none' }}>
                        <Controller
                            name='url'
                            control={control}
                            rules={{ required: 'Debe ingresar URL de repositorio' }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label='URL de Repositorio'
                                    variant='outlined'
                                    fullWidth
                                    type='url'
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    </div>
                </TableCell>
                <TableCell align='right'>
                    <div className='flex items-center justify-end text-gray-700 font-medium text-sm'>
                        <Button
                            variant='contained'
                            color='success'
                            disableElevation
                            size='small'
                            disabled={isPending || !isValid}
                            onClick={handleSubmit(onSubmit)}
                        >
                            {!isPending ? <SaveAsRoundedIcon /> : <SyncIcon className='animate-spin' style={{ animationDirection: 'reverse' }} />}
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
        </>
    );
};