import React from "react";
import CommentBar from "./CommentBar";

export default function RenderComment ({ comment, level = 0, post, pageType="post" }) {
    return (
      <div className="mt-4" style={{ marginLeft: `${level * 16}px` }}>
        <CommentBar
          id={comment.id}
          author={comment.author}
          createdAt={comment.createdAt}
          text={comment.text}
          post={post}
          pageType={pageType}
        />
        {comment.children?.map(child => (
          <RenderComment key={child.id} comment={child} level={level + 1} post={post} />
        ))}
      </div>
    );
  };