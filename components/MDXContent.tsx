'use client';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface Props {
  source: string;
}

export default function MDXContent({ source }: Props) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    serialize(source, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      },
    }).then(setMdxSource);
  }, [source]);

  if (!mdxSource) return null;
  return <MDXRemote {...mdxSource} />;
}
