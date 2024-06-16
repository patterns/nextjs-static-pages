import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEdit } from 'components/courses';
import { Spinner } from 'components';
import { courseService, alertService } from 'services';

export default Edit;

function Edit() {
    const router = useRouter();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch course and set default form values if in edit mode
        courseService.getById(id)
            .then(x => setCourse(x))
            .catch(alertService.error)
    }, [router]);

    return (
        <Layout>
            <h1>Edit Course</h1>
            {course ? <AddEdit course={course} /> : <Spinner />}
        </Layout>
    );
}
