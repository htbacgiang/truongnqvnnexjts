import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import parse from "html-react-parser";
import Head from "next/head";
import DefaultLayout from "../../components/layout/DefaultLayout";
import db from "../../utils/db";
import Post from "../../models/Post";
import Share from "../../components/common/Share";
import Link from "next/link";
import Image from "next/image";
import { trimText } from "../../utils/helper";
import AdBanner from "../../components/profiles/AdBanner";

interface PostData {
  id: string;
  title: string;
  content: string;
  meta: string;
  tags: string[];
  slug: string;
  thumbnail: string;
  createdAt: string;
  category: string;
  relatedPosts: {
    id: string;
    title: string;
    slug: string;
    category: string;
    thumbnail?: string;
    createdAt: string;
  }[];
}

interface MetaData {
  title: string;
  description: string;
  author: string;
  canonical: string;
  og: {
    title: string;
    description: string;
    type: string;
    image: string;
    imageWidth: string;
    imageHeight: string;
    url: string;
    siteName: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
}

interface Props {
  post: PostData;
  meta: MetaData;
}

const host = "https://truongnq.vn";
export const APP_NAME = "Trường NQ Web";

const SinglePost: NextPage<Props> = ({ post, meta = {} as MetaData }) => {
  const {
    title = "Bài viết không có tiêu đề",
    content = "",
    meta: postMeta = "",
    slug = "",
    thumbnail = "",
    category = "Chưa phân loại",
    createdAt = new Date().toISOString(),
    relatedPosts = [],
  } = post || {};

  // Fallback values for meta
  const safeMeta: MetaData = {
    title: meta.title || `${title}`,
    description: meta.description || postMeta || trimText(content.replace(/<[^>]*>?/gm, ' '), 150),
    author: meta.author || "Trường NQ",
    canonical: meta.canonical || `${host}/bai-viet/${slug}`,
    og: {
      title: meta.og?.title || `${title}`,
      description: meta.og?.description || postMeta || trimText(content.replace(/<[^>]*>?/gm, ' '), 150),
      type: meta.og?.type || "article",
      image: meta.og?.image || thumbnail || `${host}/images/baner-web.jpg`,
      imageWidth: meta.og?.imageWidth || "1200",
      imageHeight: meta.og?.imageHeight || "630",
      url: meta.og?.url || `${host}/bai-viet/${slug}`,
      siteName: meta.og?.siteName || APP_NAME,
    },
    twitter: {
      card: meta.twitter?.card || "summary_large_image",
      title: meta.twitter?.title || `${title}`,
      description: meta.twitter?.description || postMeta || trimText(content.replace(/<[^>]*>?/gm, ' '), 150),
      image: meta.twitter?.image || thumbnail || `${host}/images/baner-web.jpg`,
    },
  };

  // JSON-LD Schema.org for BlogPosting
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${host}/bai-viet/${slug}`,
    },
    "headline": title,
    "image": thumbnail || `${host}/images/baner-web.jpg`,
    "datePublished": createdAt,
    "dateModified": createdAt,
    "author": {
      "@type": "Person",
      "name": safeMeta.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": APP_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${host}/logo.png`,
      },
    },
    "description": safeMeta.description,
    "articleBody": content.replace(/<[^>]*>?/gm, ' '),
  };

  return (
    <DefaultLayout >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="container mx-auto px-5 py-8 md:flex md:space-x-8">
        <div className="flex-[3] mb-4 md:mb-0">
          <div className="md:pb-20 pb-6 container mx-auto mt-[60px] sm:mt-[91px]">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="flex font-semibold gap-2 text-base text-gray-600">
              <Link href="/" className="hover:text-blue-800 whitespace-nowrap">
                Trang chủ
              </Link>
              <span className="text-gray-400">›</span>
              <Link href="/bai-viet" className="hover:text-blue-800 whitespace-nowrap">
                Bài viết
              </Link>
            </nav>

            {/* Tiêu đề bài viết */}
            <h1 className="md:text-2xl text-xl font-bold text-primary-dark dark:text-primary mt-2">
              {title}
            </h1>
            <div className="mt-2 mb-2">
              <Share url={`${host}/bai-viet/${slug}`} />
            </div>
            <div className="mt-2 uppercase text-green-800 font-xl">
              <b>{category}</b>
            </div>
     
            <div className="blog prose prose-lg dark:prose-invert max-w-2xl md:max-w-4xl lg:max-w-5xl">
              {parse(content)}
            </div>
          </div>
        </div>

        {/* Related Posts Section */}
        <aside className="flex-[1] md:mt-[91px] mt-10">
          <div className="pt-5">
            <h2 className="text-2xl font-semibold text-primary-dark dark:text-primary p-2 mb-4">
              Bài viết cùng chủ đề
            </h2>
            {relatedPosts.length > 0 ? (
              <div className="flex flex-col space-y-4">
                {relatedPosts
                  .filter((p) => p.category === category)
                  .slice(0, 5)
                  .map((p) => (
                    <Link key={p.slug} href={`/bai-viet/${p.slug}`}>
                      <div className="flex space-x-3 items-start group">
                        {p.thumbnail && (
                          <Image
                            src={p.thumbnail}
                            alt={p.title}
                            width={120}
                            height={90}
                            sizes="120px"
                            style={{ objectFit: "cover" }}
                            className="rounded-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        <div className="flex flex-col text-sm">
                          <span className="text-gray-800 font-medium group-hover:text-blue-700 leading-snug">
                            {p.title}
                          </span>
                          <span className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            📅 {new Date(p.createdAt).toLocaleDateString("vi-VN", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500">Không có bài viết liên quan.</p>
            )}
            <AdBanner key="related-posts-ad" adSlot="7944007968" />
          </div>
        </aside>
      </div>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps<
  Props,
  { slug: string }
> = async ({ params }) => {
  try {
    await db.connectDb();

    const post = await Post.findOne({ slug: params?.slug }).lean();
    if (!post) {
      console.log(`Post not found for slug: ${params?.slug}`);
      return { notFound: true };
    }

    const posts = await Post.find({
      _id: { $ne: post._id },
      category: post.category || "Chưa phân loại",
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("slug title thumbnail category createdAt")
      .lean();

    const relatedPosts = posts.map((p) => ({
      id: p._id.toString(),
      title: p.title || "Bài viết không có tiêu đề",
      slug: p.slug,
      category: p.category || "Chưa phân loại",
      thumbnail: p.thumbnail?.url || undefined,
      createdAt: p.createdAt.toISOString(),
    }));

    const {
      _id,
      title = "Bài viết không có tiêu đề",
      content = "",
      meta = "",
      slug = params?.slug || "",
      tags = [],
      thumbnail,
      category = "Chưa phân loại",
      createdAt = new Date(),
    } = post;

    const metaData: MetaData = {
      title: `${title}`,
      description: meta || trimText(content.replace(/<[^>]*>?/gm, ' '), 150),
      author: "Trường NQ",
      canonical: `${host}/bai-viet/${slug}`,
      og: {
        title: `${title}`,
        description: meta || trimText(content.replace(/<[^>]*>?/gm, ' '), 150),
        type: "article",
        image: thumbnail?.url || `${host}/images/baner-web.jpg`,
        imageWidth: "1200",
        imageHeight: "630",
        url: `${host}/bai-viet/${slug}`,
        siteName: APP_NAME,
      },
      twitter: {
        card: "summary_large_image",
        title: `${title}`,
        description: meta || trimText(content.replace(/<[^>]*>?/gm, ' '), 150),
        image: thumbnail?.url || `${host}/images/baner-web.jpg`,
      },
    };

    const postData: PostData = {
      id: _id.toString(),
      title,
      content,
      meta,
      slug,
      tags,
      category,
      thumbnail: thumbnail?.url || "",
      createdAt: createdAt.toISOString(),
      relatedPosts,
    };

    return {
      props: {
        post: postData,
        meta: metaData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return { notFound: true };
  } finally {
    await db.disconnectDb();
  }
};

export default SinglePost;