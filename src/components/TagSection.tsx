import MiniTag from "@/MiniTag";
import { useState, useEffect } from "react";
import client from "@/database/client";
import { QueryData } from "@supabase/supabase-js";

type TagSectionProps = {
    resourceId: number
}
export default function TagSection({resourceId}:TagSectionProps){
    const tagsQuery = client.from("tag_resource").select("tags(name)").eq("id", resourceId);
    type TagsType = QueryData<typeof tagsQuery>;
    const [tags, setTags] = useState<TagsType>([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            const { data, error } = await tagsQuery;
            if (error) throw error;
            const tags: TagsType = data;
            setTags(tags)
        }
        fetchData();
    }, [])

    return (
        <>{tags.map(tag=>{
            return<MiniTag>{tag.tags.name}</MiniTag>
        })}
        </>
    )
}