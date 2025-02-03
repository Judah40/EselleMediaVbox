'use client'
import React, { useState } from 'react';
import { 
  MailOpen, 
  RefreshCcw, 
  Search, 
  Trash2, 
  Archive, 
  Star,
  X,
  Reply,
  Forward,
  MoreHorizontal
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { data as messageData } from '@/app/api/DummyData/messageDummyData';

const Page = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  interface MessageData {
    id: number;
    sender: string;
    subject: string;
    timestamp: string;
    unread: boolean;
    starred: boolean;
    content?: string;
    attachments?: string[];
  }

  const data: MessageData[] = messageData;

  interface Message {
    id: number;
    sender: string;
    subject: string;
    timestamp: string;
    unread: boolean;
    starred: boolean;
    content?: string;
    attachments?: string[];
  }

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedItems(data.map((item) => item.id));
    } else {
      setCheckedItems([]);
    }
  };

  interface HandleCheckSingleEvent extends React.ChangeEvent<HTMLInputElement> {
    stopPropagation: () => void;
  }

  const handleCheckSingle = (e: HandleCheckSingleEvent, id: number) => {
    e.stopPropagation();
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter(item => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const filteredData = data.filter(item =>
    item.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 p-4 gap-4 flex flex-col relative bg-gray-900 min-h-screen">
      {/* Search bar */}
      <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <Input
        placeholder="Search emails..."
        className="w-full pl-10 pr-4 py-2 bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      </div>

      {/* Action Bar */}
      <div className="w-full max-w-3xl mx-auto bg-gray-800 rounded-t-lg shadow-sm">
      <div className="p-3 flex items-center gap-4 border-b border-gray-700">
        <input 
        type="checkbox" 
        className="w-4 h-4 rounded border-gray-600"
        onChange={handleCheckAll}
        checked={checkedItems.length === data.length}
        />
        
        <Button
        variant="ghost"
        size="sm"
        className="hover:bg-gray-700"
        onClick={() => {}}
        >
        <RefreshCcw className="h-4 w-4 mr-2" />
        Refresh
        </Button>

        <Button
        variant="ghost"
        size="sm"
        className="hover:bg-gray-700"
        onClick={() => {}}
        >
        <MailOpen className="h-4 w-4 mr-2" />
        Mark as Read
        </Button>

        <Button
        variant="ghost"
        size="sm"
        className="hover:bg-gray-700"
        onClick={() => {}}
        >
        <Archive className="h-4 w-4 mr-2" />
        Archive
        </Button>

        <Button
        variant="ghost"
        size="sm"
        className="hover:bg-gray-700 text-red-400"
        onClick={() => {}}
        >
        <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      </div>

      {/* Messages List */}
      <div className="w-full max-w-3xl mx-auto bg-gray-800 rounded-b-lg shadow-sm flex-1">
      <div className="divide-y divide-gray-700">
        {filteredData.map((message, index) => (
        <div
          key={index}
          onClick={() => setSelectedMessage(message)}
          className={`flex items-start gap-4 p-4 hover:bg-gray-700/50 cursor-pointer transition-colors
          ${message.unread ? 'bg-blue-900/10' : ''}`}
        >
          <div className="flex items-center gap-4">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-600"
            checked={checkedItems.includes(message.id)}
            onChange={(e) => handleCheckSingle(e, message.id)}
          />
          <Star 
            className={`h-5 w-5 ${message.starred ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
          />
          </div>

          <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-100">
            {message.sender}
            </p>
            {message.unread && (
            <Badge variant="secondary" className="bg-blue-900 dark:text-blue-100">
              New
            </Badge>
            )}
          </div>
          <p className="text-sm text-gray-300 truncate">
            {message.subject}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {message.timestamp}
          </p>
          </div>
        </div>
        ))}
      </div>
      </div>

      {/* Message Detail Modal */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
      <DialogContent className="max-w-2xl bg-gray-800">
        <DialogHeader>
        <DialogTitle className="flex justify-between items-start">
          <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-100">{selectedMessage?.subject}</h2>
          <p className="text-sm text-gray-300">
            From: {selectedMessage?.sender}
          </p>
          </div>
          <div className="text-sm text-gray-400">
          {selectedMessage?.timestamp}
          </div>
        </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
          <Reply className="h-4 w-4 mr-2" />
          Reply
          </Button>
          <Button variant="outline" size="sm">
          <Forward className="h-4 w-4 mr-2" />
          Forward
          </Button>
          <Button variant="outline" size="sm">
          <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-300 whitespace-pre-wrap">
          {selectedMessage?.content || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
          </p>
        </div>

        {selectedMessage?.attachments && (
          <div className="border-t border-gray-700 pt-4">
          <h3 className="text-sm font-medium mb-2 text-gray-100">Attachments</h3>
          <div className="flex gap-2">
            {selectedMessage.attachments.map((attachment, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 border border-gray-700 rounded"
            >
              <span className="text-sm text-gray-300">{attachment}</span>
            </div>
            ))}
          </div>
          </div>
        )}
        </div>
      </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;