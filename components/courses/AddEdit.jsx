import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { courseService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const course = props?.course;
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        description: Yup.string()
            .required('Description is required'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            // password optional in edit mode
            .concat(course ? null : Yup.string().required('Password is required'))
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (course) {
        formOptions.defaultValues = props.course;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit(data) {
        alertService.clear();
        try {
            // create or update course based on course prop
            let message;
            if (course) {
                await courseService.update(course.id, data);
                message = 'Course updated';
            } else {
                await courseService.register(data);
                message = 'Course added';
            }

            // redirect to course list with success message
            router.push('/courses');
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">Title</label>
                    <input name="title" type="text" {...register('title')} className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">Description</label>
                    <input name="description" type="text" {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                </div>
            </div>
            <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">Category</label>
                    <input name="category" type="text" {...register('category')} className={`form-control ${errors.category ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.category?.message}</div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">Published</label>
                    <input name="published" type="text" {...register('published')} className={`form-control ${errors.published ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.published?.message}</div>
                </div>
            </div>
            <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">URL</label>
                    <input name="url" type="text" {...register('url')} className={`form-control ${errors.url ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.url?.message}</div>
                </div>
            </div>
            <div className="mb-3">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/courses" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}
