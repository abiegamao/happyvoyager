"use client";

import { useState } from "react";
import { Comment } from "@/lib/mock-data";
import LeadForm from "./LeadForm";
import { User as UserIcon, MessageSquare, Send } from "lucide-react";

interface CommentSectionProps {
    initialComments: Comment[];
    slug: string;
}

export default function CommentSection({ initialComments, slug }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [leadInfo, setLeadInfo] = useState<{ name: string; email: string; phone: string } | null>(null);
    const [newComment, setNewComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Mock checking local storage or existing session for lead info could go here

    const handleLeadSuccess = (data: { name: string; email: string; phone: string }) => {
        setLeadInfo(data);
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !leadInfo) return;

        setSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            const comment: Comment = {
                _id: Math.random().toString(36).substr(2, 9),
                blogId: "mock-id", // In real app would be from slug/props
                leadId: "mock-lead",
                leadName: leadInfo.name,
                comment: newComment,
                createdAt: new Date().toISOString(),
            };

            setComments([comment, ...comments]);
            setNewComment("");
            setSubmitting(false);
        }, 800);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="max-w-3xl mx-auto mt-16 pb-16">
            <div className="flex items-center space-x-3 mb-8">
                <div className="bg-[var(--color-secondary)] p-2 rounded-full">
                    <MessageSquare className="w-5 h-5 text-[var(--color-charcoal)]" />
                </div>
                <h2 className="text-2xl font-bold text-[var(--color-charcoal)]">
                    Comments <span className="text-[var(--color-muted-foreground)] text-lg font-normal">({comments.length})</span>
                </h2>
            </div>

            <div className="space-y-12">
                {/* Comment Form Area */}
                <section className="animate-fade-in">
                    {!leadInfo ? (
                        <div className="bg-[var(--color-secondary)]/30 p-1 rounded-2xl">
                            <LeadForm onSuccess={handleLeadSuccess} />
                        </div>
                    ) : (
                        <div className="bg-white p-6 rounded-2xl border border-[var(--color-border)] shadow-sm">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)]">
                                    <UserIcon className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[var(--color-charcoal)]">Commenting as <span className="text-[var(--color-primary)]">{leadInfo.name}</span></p>
                                    <button onClick={() => setLeadInfo(null)} className="text-xs text-[var(--color-muted-foreground)] hover:underline">Change</button>
                                </div>
                            </div>

                            <form onSubmit={handleCommentSubmit} className="space-y-4">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Share your thoughts..."
                                    className="w-full p-4 rounded-xl border border-[var(--color-input)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all min-h-[120px] resize-y bg-[var(--color-background)]/50"
                                    required
                                />
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="btn-primary py-2 px-6 flex items-center space-x-2 text-sm"
                                    >
                                        <span>Post Comment</span>
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </section>

                {/* Existing Comments list */}
                <section className="space-y-6">
                    {comments.length === 0 ? (
                        <p className="text-center text-[var(--color-muted-foreground)] italic py-8">No comments yet. Be the first to share your thoughts!</p>
                    ) : (
                        comments.map((comment) => (
                            <article key={comment._id} className="flex space-x-4 p-6 bg-white rounded-2xl border border-[var(--color-border)] shadow-sm animate-slide-up">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-border)] flex items-center justify-center">
                                        <span className="font-bold text-[var(--color-charcoal)]">{comment.leadName.charAt(0)}</span>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-[var(--color-charcoal)]">{comment.leadName}</h4>
                                        <time className="text-xs text-[var(--color-muted-foreground)]">{formatDate(comment.createdAt)}</time>
                                    </div>
                                    <p className="text-[var(--color-foreground)] leading-relaxed">{comment.comment}</p>
                                </div>
                            </article>
                        ))
                    )}
                </section>
            </div>
        </div>
    );
}
