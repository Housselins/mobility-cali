import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //const router = useRouter();

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post('http://localhost:4000/auth', data);
            console.log('Response:', response.data);
            //router.push('/dashboard');
            window.location.href = '/dashboard';

        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form" style={{ width: '100%', height: '100%' }}>
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '25px' }}>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input {...register("email", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email" />
                    {errors.email && <p className="text-red-500 text-xs italic">Email es requerido.</p>}
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input {...register("password", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                    {errors.password && <p className="text-red-500 text-xs italic">Password es requerido.</p>}
                </div>

                <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Send Data
                </button>
            </div>
        </form>
    );
}
