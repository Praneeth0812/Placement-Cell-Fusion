"use client";  // Add this line to mark the component as a Client Component

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa"; // Import a search icon

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [view, setView] = useState('notifications'); // State to control visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = (e) => {
    if (e.target === e.currentTarget) {
      setSidebarOpen(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (e) => {
    const sidebar = document.querySelector(`.${styles.sidebar}`);
    const dropdown = document.querySelector(`.${styles.dropdownMenu}`);

    if (sidebar && !sidebar.contains(e.target) && sidebarOpen) {
      setSidebarOpen(false);
    }

    if (dropdown && !dropdown.contains(e.target) && dropdownOpen) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen, dropdownOpen]);

  const handleViewChange = (view) => {
    setView(view);
  };

  return (
    <div className={styles.dashboard}>
      {/* Background Image */}
      <div className={styles.backgroundImage}></div>

      {/* Top Image */}
      <div className={styles.topImageContainer}>
        <Image
          src="/top_image.png"
          alt="Top Image"
          layout="responsive"
          width={1000}
          height={300}
        />
      </div>

      {/* Menu Bar */}
      <div className={styles.menuBar}>
        <div className={styles.menuleft}>
        <div className={styles.hamburgerMenu} onClick={toggleSidebar}>
          &#9776;
        </div>
        </div>
        <div className={styles.menuCenterText}>Dashboard</div> {/* Added text */}
        <div className={styles.menuRight}>
          <div className={styles.searchBarContainer}>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchBar}
            />
            <FaSearch className={styles.searchIcon} />
          </div>
          <div className={styles.profileInfo} onClick={toggleDropdown}>
            <Image
              src="/profile_pic.png"
              alt="Profile Picture"
              width={40}
              height={40}
              className={styles.profilePicSmall}
            />
            <p className={styles.studentName}>Praneeth</p>
          </div>
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <ul>
                <li>Profile</li>
                <li>Settings</li>
                <li>Notifications</li>
                <li>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}
        onClick={closeSidebar}
      >
        <div className={styles.sidebarProfile}>
          <Image
            src="/profile_pic.png"
            alt="Profile Picture"
            width={80}
            height={80}
            className={styles.sidebarProfilePic}
          />
          <p className={styles.sidebarName}>Praneeth</p>
        </div>
        <ul>
          {Array.from({ length: 12 }, (_, i) => (
            <li key={i} className={styles.sidebarModule}>
              Module {i + 1}
            </li>
          ))}
        </ul>
      </div>

      {/* Student Details Container */}
      <div className={styles.studentDetailsContainer}>
        <div className={styles.profilePicContainer}>
          <Image
            src="/profile_pic.png"
            alt="Profile Picture"
            width={100}
            height={100}
            className={styles.profilePic}
          />
          <p className={styles.studentBadge}>Student</p>
        </div>
        <div className={styles.studentDetailsText}>
          <p>Name: Praneeth</p>
          <p>Roll Number: 22BCS091</p>
          <p>Department: Computer Science Engineering</p>
          <p>Semester: 5</p>
        </div>
      </div>

      {/* Notifications and Announcements Container */}
      <div className={styles.notificationsAnnouncementsContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.buttonsContainer}>
            <span
              className={`${styles.notificationsButton} ${view === 'notifications' ? styles.activeTab : ''}`}
              onClick={() => handleViewChange('notifications')}
            >
              Notifications
            </span>
            <span
              className={`${styles.announcementsButton} ${view === 'announcements' ? styles.activeTab : ''}`}
              onClick={() => handleViewChange('announcements')}
            >
              Announcements
            </span>
          </div>
        </div>
        <div className={`${styles.notificationsSection} ${view === 'notifications' ? styles.active : ''}`}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className={styles.notification}>
              <p className={styles.notificationTitle}>Gymkhana Module</p>
              <p className={styles.notificationText}>
                A session by BitByte Club will be organized in CR01 by someone.
              </p>
              <span className={styles.closeButton}>&#10005;</span>
            </div>
          ))}
        </div>
        <div className={`${styles.announcementsSection} ${view === 'announcements' ? styles.active : ''}`}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className={styles.announcement}>
              <p className={styles.announcementTitle}>Academics Module</p>
              <p className={styles.announcementText}>
                A session by BitByte Club will be organized in CR01 by someone.
              </p>
              <span className={styles.closeButton}>&#10005;</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modules Container */}
      <div className={styles.modulesContainer}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className={styles.moduleContainer}>
            <p className={styles.moduleTitle}>Module {i + 1}</p>
            <p className={styles.moduleInfo}>
              This is some additional information about Module {i + 1}.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
