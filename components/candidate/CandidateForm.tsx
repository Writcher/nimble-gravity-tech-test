import { getCandidateDataByEmail } from "@/services/candidate.service";
import { CandidateData } from "@/types/candidate.types";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import SyncIcon from '@mui/icons-material/Sync';
import { useEffect, useState } from "react";

interface CandidateFormProps {
    setCandidate: React.Dispatch<React.SetStateAction<CandidateData | null>>
};

interface CandidateFormData {
    email: string
};

export function CandidateForm({ setCandidate }: CandidateFormProps) {
    const { control, handleSubmit, formState: { isValid } } = useForm<CandidateFormData>({
        defaultValues: {
            email: ''
        }
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (email: string) => getCandidateDataByEmail({ email }),
        onSuccess: (data) => setCandidate(data)
    });

    const onSubmit = (data: CandidateFormData) => {
        mutate(data.email);
    };

    useEffect(() => {
        if (isError) {
            setSnackbarOpen(true);
        };
    }, [isError]);

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col items-center gap-8 w-[40%]'
            >
                <Controller
                    name='email'
                    control={control}
                    rules={{
                        required: 'Debe ingresar su correo electronico',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'El correo electronico no es valido'
                        }
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            label='Correo Electronico'
                            variant='outlined'
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                />
                <Button
                    type='submit'
                    variant='contained'
                    endIcon={isPending ? <SyncIcon className='animate-spin' style={{ animationDirection: 'reverse' }} /> : null}
                    disabled={isPending || !isValid}
                    disableElevation
                    fullWidth
                >
                    {isPending ? 'Buscando Candidato' : 'Buscar Candidato'}
                </Button>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    severity='error'
                    variant='filled'
                >
                    {
                        error instanceof Error
                            ? error.message
                            : 'Error al buscar candidato'
                    }
                </Alert>
            </Snackbar>
        </>
    );
};