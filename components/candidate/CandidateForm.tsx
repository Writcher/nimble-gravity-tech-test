import { getCandidateDataByEmail } from "@/services/candidate.service";
import { CandidateData } from "@/types/candidate.types";
import { Button, Snackbar, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import SyncIcon from '@mui/icons-material/Sync';

interface CandidateFormProps {
    setCandidate: React.Dispatch<React.SetStateAction<CandidateData | null>>
};

interface CandidateFormData {
    email: string
};

export function CandidateForm({ setCandidate }: CandidateFormProps) {
    const { control, handleSubmit, formState: { isValid } } = useForm<CandidateFormData>();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (email: string) => getCandidateDataByEmail({ email }),
        onSuccess: (data) => setCandidate(data)
    });

    const onSubmit = (data: CandidateFormData) => {
        mutate(data.email);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col items-center gap-4 w-[40%]'
            >
                <Controller
                    name='email'
                    control={control}
                    rules={{ required: 'Debe ingresar su correo electronico' }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            label='Correo Electronico'
                            variant='outlined'
                            fullWidth
                            type='email'
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                />
                <Button
                    type='submit'
                    endIcon={isPending ? <SyncIcon className='animate-spin' style={{ animationDirection: 'reverse' }} /> : null}
                    disabled={isPending || !isValid}
                    disableElevation
                    fullWidth
                >
                    {isPending ? 'Buscando Candidato' : 'Buscar Candidato'}
                </Button>
            </form>
            <Snackbar
                open={isError}
                color='error'
                autoHideDuration={6000}
                message={
                    error instanceof Error
                        ? error.message
                        : 'Error al buscar candidato'
                }
            />
        </>
    );
};