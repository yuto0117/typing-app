import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Modal from "react-modal";
import { Head, Link, useForm } from '@inertiajs/react';
import Button from '@mui/material/Button';
import Nav from '@/Components/Nav';

const customStyles = {
    content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minHeight: '40%',
        minWidth: '40%',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
};

const Create = ({ questions, auth }) => {


    const [ModalRegistOpen, setModalRegistOpen] = useState(false);
    const [ModalEditOpen, setModalEditOpen] = useState(false);
    const [items, setItems] = useState(questions);
    const [id, setId] = useState();
    const [userid, setUserid] = useState();
    const [question, setQuestion] = useState();
    const [is_active, setIs_active] = useState(false);


    const { data, setData, post, processing, errors, reset } = useForm({
        id: "",
        question: '',
        is_active: true,
    });

    useEffect(() => {
        setUserid(auth.user.id);
    }, []);

    useEffect(() => {
        const handlePopState = () => {
            window.location.reload();
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);




    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);



    const Regist = () => {
        setQuestion("");
        setIs_active(true);
        setModalRegistOpen(true);
    };

    const Edit = (item) => {
        setId(item.id);
        setQuestion(item.question);
        setIs_active(Boolean(item.is_active));
        setModalEditOpen(true);
    };

    const Delete = async (item, e) => {

        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/delete', { id: item.id, userid });
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const RegistSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/store', { question, is_active, userid });
            setItems(response.data);
            setModalRegistOpen(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    const EditSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/update', { id, question, is_active, userid });
            setItems(response.data);
            setModalEditOpen(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setModalEditOpen(false);
    };





    return (


        <div>
            <Nav />

            <Modal isOpen={ModalRegistOpen} style={customStyles}>
                <div>
                    <form onSubmit={RegistSubmit}>
                        <div>
                            <InputLabel htmlFor="question" value="question" />

                            <TextInput
                                id="question"
                                name="question"
                                value={question}
                                className="mt-1 block w-full"
                                autoComplete="question"
                                isFocused={true}
                                onChange={(e) => setQuestion(e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">

                            <div>
                                <input
                                    type="radio"
                                    id="public"
                                    name="is_active"
                                    value={true}
                                    checked={is_active === true}
                                    onChange={() => setIs_active(true)}
                                />
                                <label htmlFor="public">公表</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id="private"
                                    name="is_active"
                                    value={false}
                                    checked={is_active === false}
                                    onChange={() => setIs_active(false)}
                                />
                                <label htmlFor="private">非公表</label>
                            </div>


                            <InputError message={errors.is_active} className="mt-2" />
                        </div>


                        <div className="flex items-center justify-end mt-4">
                            <button
                                onClick={() => {
                                    setModalRegistOpen(false);
                                }}
                            >
                                戻る
                            </button>
                            <PrimaryButton className="ms-4" disabled={processing}>
                                Register
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal isOpen={ModalEditOpen} style={customStyles}>
                <div>
                    <form onSubmit={EditSubmit}>
                        <div>
                            <InputLabel htmlFor="question" value="question" />

                            <TextInput
                                id="question"
                                name="question"
                                value={question}
                                className="mt-1 block w-full"
                                autoComplete="question"
                                isFocused={true}
                                onChange={(e) => setQuestion(e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">

                            <div>
                                <input
                                    type="radio"
                                    id="public"
                                    name="is_active"
                                    value={true}
                                    checked={is_active === true}
                                    onChange={() => setIs_active(true)}
                                />
                                <label htmlFor="public">公表</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id="private"
                                    name="is_active"
                                    value={false}
                                    checked={is_active === false}
                                    onChange={() => setIs_active(false)}
                                />
                                <label htmlFor="private">非公表</label>
                            </div>


                            <InputError message={errors.is_active} className="mt-2" />
                        </div>


                        <div className="flex items-center justify-end mt-4">
                            <button
                                onClick={() => {
                                    setModalEditOpen(false);
                                }}
                            >
                                戻る
                            </button>
                            <PrimaryButton className="ms-4" disabled={processing}>
                                Register
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            <div className="container mx-auto p-4">

                <button onClick={() => Regist()} className="bg-green-500 text-white px-4 py-2 rounded-md ml-2 mb-3">新規登録</button>

                <table className="min-w-full bg-white border border-gray-200 rounded-md">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="text-left p-4">問題</th>
                            <th className="text-left p-4">状態</th>
                            <th className="text-left p-4">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="border-b">
                                <td className="p-4">{item.question}</td>
                                <td className="p-4">{item.is_active ? "公表" : "非公表"}</td>
                                <td className="p-4">
                                    <button onClick={() => Edit(item)} class="mr-4">Edit</button>
                                    <button onClick={(e) => Delete(item, e)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default Create;