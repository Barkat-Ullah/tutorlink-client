import NewsSection from '@/components/module/news/NewsSection';
import { getNews } from '@/services/NewsServices';
import React from 'react';

const BlogsPage =async () => {
    const data = await getNews()
   
    return (
        <div>
            <NewsSection data={data}/>
        </div>
    );
};

export default BlogsPage;