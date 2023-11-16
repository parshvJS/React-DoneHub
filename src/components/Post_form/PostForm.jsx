import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Input'
import Select from '../Select'
import RTE from '../RTE'
import serviceObj from '../../conf/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Post.css'
export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",

        },
    });
    
    const navigate = useNavigate();
    const userData = useSelector((state) => state.todo.userdata);
const id=userData.$id;
    const submit = async (data) => {
        console.log('id IS : ', id);
        if (post) {
            const file = data.image[0] ? await serviceObj.uploadFile(data.image[0]) : null;
            if (file) {
                serviceObj.deleteFile(post.featuredImage);
            }

            const dbPost = await serviceObj.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await serviceObj.uploadFile(data.image[0]);

            if (file) {
                const fileId = '65538c8102c90760f6df';
                data.featuredImage = fileId;
                const dbPost = await serviceObj.createPost({ ...data,userId:'65538c8102c90760f6df'});

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
                else {
                    console.log("error to create post ");
                }
            }
        }
        console.log('user is  : ', userData)

    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={serviceObj.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <button type="submit" className="w-full border-y-amber-950">
                    {post ? "Update" : "Submit"}
                </button>
            </div>
        </form>
    );
}


