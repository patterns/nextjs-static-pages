import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Spinner } from 'components';
import { Layout } from 'components/courses';
import { courseService } from 'services';

export default Index;

function Index() {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        courseService.getAll().then(x => setCourses(x));
    }, []);

    function deleteCourse(id) {
        setCourses(courses.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        courseService.delete(id).then(() => {
            setCourses(courses => courses.filter(x => x.id !== id));
        });
    }

    return (
        <Layout>
            <h1>Courses</h1>
            <Link href="/courses/add" className="btn btn-sm btn-success mb-2">Add Course</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Title</th>
                        <th style={{ width: '20%' }}>Description</th>
                        <th style={{ width: '10%' }}>Category</th>
                        <th style={{ width: '5%' }}>Published</th>
                        <th style={{ width: '5%' }}>URL</th>
                        <th style={{ width: '5%' }}>Instructor</th>
                    </tr>
                </thead>
                <tbody>
                    {courses && courses.map(course =>
                        <tr key={course.guid}>
                            <td>{course.title}</td>
                            <td>{course.description}</td>
                            <td>{course.category}</td>
                            <td>{course.published}</td>
                            <td>{course.url}</td>
                            <td>{course.instructor}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/courses/edit/${course.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                <button onClick={() => deleteCourse(course.id)} className="btn btn-sm btn-danger btn-delete-course" style={{ width: '60px' }} disabled={course.isDeleting}>
                                    {course.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!courses &&
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>
                    }
                    {courses && !courses.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Courses To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </Layout>
    );
}
