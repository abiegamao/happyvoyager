"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import LeadForm, { CommentUserInfo } from "./LeadForm";
import {
  User as UserIcon,
  MessageSquare,
  Send,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface CommentSectionProps {
  blogId: string; // Supabase UUID of the blog post
}

interface SupabaseComment {
  id: string;
  blog_id: string;
  author_name: string;
  content: string;
  status: string;
  created_at: string;
}

// Cookie helpers
const COOKIE_KEY = "hv_commenter";
const COOKIE_DAYS = 365;

function setCookie(value: CommentUserInfo) {
  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_DAYS);
  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

function getCookie(): CommentUserInfo | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_KEY}=`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match.split("=").slice(1).join("=")));
  } catch {
    return null;
  }
}

function deleteCookie() {
  document.cookie = `${COOKIE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

const COMMENTS_PER_PAGE = 5;

export default function CommentSection({ blogId }: CommentSectionProps) {
  const [comments, setComments] = useState<SupabaseComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<CommentUserInfo | null>(null);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);

  // Restore user info from cookie on mount
  useEffect(() => {
    const stored = getCookie();
    if (stored) setUserInfo(stored);
  }, []);

  // Fetch approved comments
  const fetchComments = async (pageIndex = 0, append = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);

    const from = pageIndex * COMMENTS_PER_PAGE;
    const to = from + COMMENTS_PER_PAGE - 1;

    const { data, error: fetchError } = await supabase
      .from("blog_comments")
      .select("id, blog_id, author_name, content, status, created_at")
      .eq("blog_id", blogId)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (!fetchError && data) {
      setComments((prev) =>
        append ? [...prev, ...(data as SupabaseComment[])] : (data as SupabaseComment[])
      );
      setHasMore(data.length === COMMENTS_PER_PAGE);
      setPage(pageIndex);
    }

    if (append) setLoadingMore(false);
    else setLoading(false);
  };

  useEffect(() => {
    if (blogId) fetchComments(0);
  }, [blogId]);

  const handleLeadSuccess = (data: CommentUserInfo) => {
    setCookie(data);
    setUserInfo(data);
  };

  const handleChangeLead = () => {
    deleteCookie();
    setUserInfo(null);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !userInfo) return;

    setSubmitting(true);
    setError("");
    setSuccessMessage("");

    const fullName = `${userInfo.firstName} ${userInfo.lastName}`.trim();

    const { error: insertError } = await supabase
      .from("blog_comments")
      .insert({
        blog_id: blogId,
        author_name: fullName,
        author_email: userInfo.email,
        content: newComment.trim(),
        status: "approved", // Auto-approve
      });

    if (insertError) {
      setError("Failed to submit comment. Please try again.");
    } else {
      setNewComment("");
      setSuccessMessage("Thanks for your comment!");
      // Refresh comments to show the new one immediately
      fetchComments(0);
    }

    setSubmitting(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMin = Math.floor(diffMs / (1000 * 60));
        return diffMin <= 1 ? "Just now" : `${diffMin} minutes ago`;
      }
      return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
    }
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 pb-16">
      {/* Header */}
      <div
        className="flex items-center justify-between mb-6 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="bg-[var(--color-secondary)] p-2 rounded-full">
            <MessageSquare className="w-5 h-5 text-[var(--color-charcoal)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-charcoal)]">
            Comments
          </h2>
          <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full text-sm font-semibold bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
            {comments.length}
          </span>
        </div>
        <button
          className="p-2 rounded-full hover:bg-[var(--color-secondary)] transition-colors cursor-pointer"
          aria-label={isExpanded ? "Collapse comments" : "Expand comments"}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-[var(--color-muted-foreground)]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[var(--color-muted-foreground)]" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-8 animate-fade-in">
          {/* Comment Form / Lead Capture */}
          <section>
            {!userInfo ? (
              <div className="bg-[var(--color-secondary)]/30 p-1 rounded-2xl">
                <LeadForm onSuccess={handleLeadSuccess} />
              </div>
            ) : (
              <div className="bg-white p-6 rounded-2xl border border-[var(--color-border)] shadow-sm">
                {/* Commenter identity bar */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)]">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-charcoal)]">
                      Commenting as{" "}
                      <span className="text-[var(--color-primary)]">
                        {userInfo.firstName} {userInfo.lastName}
                      </span>
                    </p>
                    <button
                      onClick={handleChangeLead}
                      className="text-xs text-[var(--color-muted-foreground)] hover:underline"
                    >
                      Change
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg border border-red-100 mb-4">
                    {error}
                  </div>
                )}

                {successMessage && (
                  <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-100 mb-4">
                    {successMessage}
                  </div>
                )}

                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full p-4 rounded-xl border border-[var(--color-input)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all min-h-[100px] resize-y bg-[var(--color-background)]/50"
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary py-2 px-6 flex items-center space-x-2 text-sm"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Post Comment</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>

          {/* Comments List */}
          <section>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-[var(--color-primary)]" />
                <span className="ml-2 text-[var(--color-muted-foreground)]">
                  Loading comments...
                </span>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-[var(--color-border)]">
                <MessageSquare className="w-12 h-12 mx-auto text-[var(--color-muted-foreground)]/30 mb-3" />
                <p className="text-[var(--color-muted-foreground)]">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="divide-y divide-[var(--color-border)]">
                  {comments.map((comment) => (
                    <article key={comment.id} className="py-4 first:pt-0 flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
                          <UserIcon className="w-5 h-5 text-[var(--color-muted-foreground)]" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-[var(--color-charcoal)]">
                            {comment.author_name}
                          </span>
                          <span className="text-xs text-[var(--color-muted-foreground)]">
                            {formatDate(comment.created_at)}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--color-foreground)] leading-relaxed">
                          {comment.content}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

                {hasMore && (
                  <div className="pt-4 text-center">
                    <button
                      onClick={() => fetchComments(page + 1, true)}
                      disabled={loadingMore}
                      className="text-sm font-medium text-[var(--color-primary)] hover:underline disabled:opacity-50"
                    >
                      {loadingMore ? "Loading..." : "Load more comments"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
