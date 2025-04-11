'use client';

import { memo } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

const ContactDialogContent = memo(() => (
    <DialogContent className="sm:max-w-md">
        <DialogHeader>
            <DialogTitle className="text-xl font-bold">Contact Us</DialogTitle>
            <DialogDescription className="text-base">
                Feel free to reach out to us with any questions or inquiries.
            </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="grid grid-cols-[24px_1fr] items-start gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <div>
                    <h4 className="text-sm font-medium leading-none mb-1">Address</h4>
                    <p className="text-sm text-gray-700">
                        Department of Computer Science, Shivaji College, University of Delhi, Delhi, 110027
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-[24px_1fr] items-start gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <div>
                    <h4 className="text-sm font-medium leading-none mb-1">Email</h4>
                    <p className="text-sm text-gray-700">
                        <a href="mailto:websters@shivaji.du.ac.in" className="text-blue-600 hover:underline">
                            websters@shivaji.du.ac.in
                        </a>
                    </p>
                </div>
            </div>
        </div>
        <DialogFooter className="flex justify-center sm:justify-center">
            <div className="flex gap-x-6">
                <a href="https://instagram.com/websters" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-pink-600 transition-colors">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                </a>
                <a href="https://www.linkedin.com/company/websters" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-blue-700 transition-colors">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                    </svg>
                </a>
            </div>
        </DialogFooter>
    </DialogContent>
));
ContactDialogContent.displayName = 'ContactDialogContent';

const ContactDialogBox = ({ open, onOpenChange }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <ContactDialogContent />
        </Dialog>
    );
};

export default memo(ContactDialogBox); 