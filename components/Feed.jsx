'use client' //سلام من محراب هستم
import React, { useEffect, useState } from 'react' // ری‌اکت و هوک‌ها رو ایمپورت کردم، چیزای ضروری برای کارمون.
import PostCard from './PostCard' // این کامپوننت PostCard رو آوردم، برای نمایش پست‌ها به صورت کارت.
import { useSession } from 'next-auth/react' // این هوک useSession رو آوردم، برای مدیریت سشن و لاگین کاربرا.
import Image from '@node_modules/next/image' // این ایمیج رو از نکست آوردم، برای نمایش آیکون سرچ.
import Loading from './loading' // این کامپوننت لودینگ رو آوردم، برای نمایش وقتی که دیتا داره لود میشه.

const Feeder = ({ data }) => { // این کامپوننت Feeder رو ساختم، برای نمایش لیست پست‌ها پشت سر هم.
  return (
    <div className='flex flex-row-reverse max-md:flex-col-reverse gap-10 flex-wrap mb-10 justify-center'> 
      {data.map((post) => ( // دیتا رو مپ کردم، یعنی تک تک پست‌ها رو گرفتم.
        <PostCard // کامپوننت PostCard رو رندر کردم.
          post={post} // پست رو به کامپوننت پاس دادم.
          key={post._id} // کلید یونیک برای هر پست، برای ری‌اکت لازمه.
        />
      ))}
    </div>
  )
}

const Feed = () => { // این کامپوننت Feed رو ساختم، کامپوننت اصلی فید که همه چی اینجا اتفاق می‌افته.
  const { data: session, status } = useSession(); // سشن رو از هوک گرفتم، برای چک کردن وضعیت لاگین.
  const [data, setData] = useState([]); // دیتای پست‌ها رو تو این استیت نگه داشتم.
  const [searchQuery, setSearchQuery] = useState(""); // کوئری سرچ رو تو این استیت نگه داشتم.
  const [loading, setLoading] = useState(true); // وضعیت لودینگ رو تو این استیت نگه داشتم.

  const fetchPosts = async () => { // این فانکشن رو ساختم، برای گرفتن پست‌ها از سرور.
    setLoading(true); // لودینگ رو ترو کردم، یعنی داره لود میشه.
    const response = await fetch("/api/post"); // ای‌پی‌آی پست رو کال کردم.
    const data = await response.json(); // جواب رو به جیسون تبدیل کردم.
    setData(data); // دیتا رو ست کردم.
    setLoading(false); // لودینگ رو فالس کردم، یعنی لود تموم شد.
  };

  useEffect(() => { // این هوک useEffect رو گذاشتم، وقتی کامپوننت مانت میشه این اجرا بشه.
    if (status !== 'loading') { // اگه سشن لودینگ نبود، یعنی لود شده،
      fetchPosts(); // فانکشن گرفتن پست‌ها رو اجرا کردم.
    }
  }, [status]); // سشن استاتوس رو به عنوان دیپندنسی گذاشتم، وقتی تغییر کرد این اجرا شه.

  const filteredData = data.filter((post) => // دیتا رو فیلتر کردم، بر اساس کوئری سرچ.
    post.post.toLowerCase().includes(searchQuery.toLowerCase()) || // پست رو چک کردم.
    post.tag.toLowerCase().includes(searchQuery.toLowerCase()) // تگ رو چک کردم.
  );

  return (
    <>
      <div className='w-[300px] mx-auto bg-transparent border rounded-3xl h-[45px] px-2 mt-[-20px] mb-[10px] flex flex-row gap-2'> 
        <Image src={'assets/search.svg'} width={30} height={30} alt='k'/>
        <input // این اینپوت رو گذاشتم، برای وارد کردن کوئری سرچ.
          placeholder='Search...' // پلیس هولدر رو گذاشتم.
          className='bg-transparent focus:outline-none w-full' // استایل‌ها رو اعمال کردم.
          value={searchQuery} // مقدار سرچ رو ست کردم.
          onChange={(e) => setSearchQuery(e.target.value)} // وقتی سرچ تغییر کرد، کوئری رو آپدیت کردم.
        />
      </div>
      <p className='text-xs w-full text-center opacity-35 text-red-500 mb-[25px]'>برای دیدن پروفایل خود و ادیت یا حذف پست روی عکس خود کلیک کنید</p> 
      {loading ? ( // اگه لودینگ ترو بود،
        <div className='h-full w-full flex items-center justify-center'><Loading/></div> // کامپوننت لودینگ رو نشون دادم.
      ) : ( // اگه لودینگ فالس بود،
        <Feeder data={filteredData} /> // کامپوننت Feeder رو با دیتای فیلتر شده نشون دادم.
      )}
    </>
  )
}

export default Feed // کامپوننت Feed رو اکسپورت کردم.