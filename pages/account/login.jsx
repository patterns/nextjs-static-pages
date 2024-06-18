import { useRouter } from 'next/router';
import Link from 'next/link';
import { headers } from 'next/headers'
////import getConfig from 'next/config'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Layout } from 'components/account';
import { userService, alertService } from 'services';

////const { publicRuntimeConfig } = getConfig();
////const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

export default Login;

async function Relayauthorization() {
    const headersList = headers()
    if (headersList.has('cf-access-jwt-assertion')) {
        // have CF Access JWT, see if backend can verify/confirm
        // fetch from server (before browser has page)
        const authorization = headersList.get('cf-access-jwt-assertion')
        ////const res = await fetch(`${baseUrl}/authenticate`, {
        const res = await fetch('https://hello-hono-opm.pages.dev/api/users/authenticate', {
          method: 'POST',
          headers: { authorization, 'Content-Type': 'application/json' },
          body: '{"username":"preview@constantinople.edu"}',
        })
        const user = await res.json()
        return <h3>{user.username}</h3>
    }
}

function Login() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ username, password }) {
        alertService.clear();
        return userService.login(username, password)
            .then(() => {
                // get return url from query parameters or default to '/'
                const returnUrl = router.query.returnUrl || '/';
                router.push(returnUrl);
            })
            .catch(alertService.error);
    }

    return (
        <Layout>
            <div className="card">
                <h4 className="card-header">Login</h4>
                <div className="card-body">

  <Relayauthorization />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} placeholder="e.g. buzz@spaceacademy.edu" />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input name="password" type="text" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="e.g. prototype" />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Login
                        </button>
                        <Link href="/account/register" className="btn btn-link">Register</Link>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
