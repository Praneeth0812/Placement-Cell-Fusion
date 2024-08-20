"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import styles from "./page.module.css";
import { FaSignOutAlt } from 'react-icons/fa'; 

// Styled components for MUI
const SearchBarContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#747272',
  borderRadius: '4px',
  marginRight: '20px',
}));

const SearchBar = styled('input')(({ theme }) => ({
  border: 'none',
  padding: '5px 10px',
  borderRadius: '4px',
  outline: 'none',
}));

const ProfileInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  marginRight: '20px',
}));

const SidebarProfile = styled('div')(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '20px',
}));

const Sidebar = styled(Drawer)(({ theme }) => ({
  width: '250px',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: '250px',
    backgroundColor: 'rgba(175, 171, 171, 0.441)',
    color: '#ffffff',
    paddingTop: '20px',
    overflowY: 'scroll',
  },
}));

const NotificationsContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '400px',
  left: '150px',
  width: 'calc(100% - 150px - 350px)',
  height: 'calc(100vh - 400px)',
  backgroundColor: 'rgba(168, 167, 167, 0.545)',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  overflowY: 'scroll',
}));

const SectionHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
}));

const ButtonsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '10px',
}));

const Button = styled('span')(({ theme, active }) => ({
  cursor: 'pointer',
  padding: '10px',
  border: 'none',
  backgroundColor: active ? '#007bff' : '#7a797952',
  color: active ? '#353434' : '#252525',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '4px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#6363636f',
  },
}));

const DropdownMenu = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '60px',
  right: '20px',
  backgroundColor: '#ffffff',
  color: '#000000',
  borderRadius: '4px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1000,
}));

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [view, setView] = useState('notifications');

  // Refs for sidebar and dropdown
  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const closeSidebar = () => setSidebarOpen(false);

  const handleClickOutside = (e) => {
    if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      closeSidebar();
    }

    if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen, dropdownOpen]);

  const handleViewChange = (view) => setView(view);

  return (
    <div className={styles.dashboard}>
      <div className={styles.topImageContainer}>
        <Image src="/top_image.png" alt="Top Image" layout="responsive" width={1000} height={300} />
      </div>

      <AppBar position="static" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#ffffff' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
            Dashboard
          </Typography>
          <SearchBarContainer>
            <SearchBar placeholder="Search..." />
            <FaSearch className={styles.searchIcon} />
          </SearchBarContainer>
          <ProfileInfo onClick={toggleDropdown}>
            <Image src="/profile_pic.png" alt="Profile Picture" width={40} height={40} className={styles.profilePicSmall} />
            <p className={styles.studentName}>Praneeth</p>
          </ProfileInfo>
          {dropdownOpen && (
            <DropdownMenu ref={dropdownRef}>
              <ul>
                <li>Profile</li>
                <li>Settings</li>
                <li>Notifications</li>
                <li>Logout</li>
              </ul>
            </DropdownMenu>
          )}
        </Toolbar>
      </AppBar>

      <Sidebar
  open={sidebarOpen}
  onClose={closeSidebar}
  ref={sidebarRef}
  PaperProps={{
    style: {
      position: 'fixed',
      top: '100px', /* Start below the top image */
      width: '250px',
      height: 'calc(100vh - 100px)', /* Adjust height as needed */
      overflow: 'hidden', /* Hide scrollbar */
    }
  }}
>
  <SidebarProfile>
    <Image
      src="/profile_pic.png"
      alt="Profile Picture"
      width={80}
      height={80}
      className={styles.sidebarProfilePic}
    />
    <p className={styles.sidebarName}>Praneeth</p>
  </SidebarProfile>
  <ul className={styles.sidebarModules}>
    <li className={styles.sidebarModule}>Academics </li>
    <li className={styles.sidebarModule}>Programme and Curriculum</li>
    <li className={styles.sidebarModule}>Mess Management</li>
    <li className={styles.sidebarModule}>Healthcare Center</li>
    <li className={styles.sidebarModule}>Complaint system</li>
    <li className={styles.sidebarModule}>Department Portal</li>
    <li className={styles.sidebarModule}>Hostel Management</li>
    <li className={styles.sidebarModule}>Visitor's Hostel</li>
    <li className={styles.sidebarModule}>Scholarship Portal</li>
    <li className={styles.sidebarModule}>Placement Cell</li>
    <li className={styles.sidebarModule}>Gymkhana</li>
    
  </ul>
  <div className={styles.logoutContainer}>
    <FaSignOutAlt className={styles.logoutIcon} />
    <span className={styles.logoutText}>Logout</span>
  </div>
</Sidebar>



      <div className={styles.studentDetailsContainer}>
        <div className={styles.profilePicContainer}>
          <Image src="/profile_pic.png" alt="Profile Picture" width={100} height={100} className={styles.profilePic} />
          <div className={styles.studentBadgeContainer}>
            <p className={styles.studentBadge}>Student</p>
          </div>
        </div>
        <div className={styles.studentDetailsText}>
          <p>Name: Praneeth</p>
          <p>Roll Number: 22BCS091</p>
          <p>Department: Computer Science Engineering</p>
          <p>Semester: 5</p>
        </div>
      </div>

      <NotificationsContainer>
        <SectionHeader>
          <ButtonsContainer>
            <Button active={view === 'notifications'} onClick={() => handleViewChange('notifications')}>
              Notifications
            </Button>
            <Button active={view === 'announcements'} onClick={() => handleViewChange('announcements')}>
              Announcements
            </Button>
          </ButtonsContainer>
        </SectionHeader>
        <div className={`${styles.notificationsSection} ${view === 'notifications' ? styles.active : styles.hidden}`}>
          {/* Notifications content here */}
        </div>
        <div className={`${styles.announcementsSection} ${view === 'announcements' ? styles.active : styles.hidden}`}>
          {/* Announcements content here */}
        </div>
      </NotificationsContainer>
    </div>
  );
}
