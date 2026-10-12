"use client";
import Navbar from '@/components/layout/Navbar';
import ConciergeModal from '@/components/modals/ConciergeModal';
import { useEnquiry } from '@/lib/enquiry';

export default function PrivacyHeader() {
  const enquiry = useEnquiry();
  return <><Navbar /><ConciergeModal isOpen={enquiry.isOpen} onClose={enquiry.close} preselectedResidence={enquiry.residence} /></>;
}
