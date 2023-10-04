import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Main from './pages/Main/Main';
import Free from './pages/Free/Free';
import Mypage from './pages/Mypage/Mypage';
import Question from './pages/Question/Question';
import Announce from './pages/Announce/Announce';
import Study from './pages/Recruit/Study/Study';
import Project from './pages/Recruit/Project/Project';
import Company from './pages/Recruit/Company/Company';
import Write from './pages/Write/Write';
import WriteFree from './pages/Write/WriteFree/WriteFree';
import WriteQuestion from './pages/Write/WriteQuestion/WriteQuestion';
import WriteCompany from './pages/Write/WriteRecruit/WriteCompany';
import WriteStudy from './pages/Write/WriteRecruit/WriteStudy';
import WriteProject from './pages/Write/WriteRecruit/WriteProject';
import MypageMylike from './pages/Mypage/MypageMylike/MypageMylike';
import MypageMycomment from './pages/Mypage/MypageMycomment/MypageMycomment';
import MypageUpdate from './pages/Mypage/MypageUpdate/MypageUpdate';
import MypageMypost from './pages/Mypage/MypageMypost/MypageMypost';
import FreeDetail from './pages/Free/FreeDetail/FreeDetail';
import QuestionDetail from './pages/Question/QuestionDetail/QuestionDetail';
import StudyDetail from './pages/Recruit/Study/StudyDetail/StudyDetail';
import CompanyDetail from './pages/Recruit/Company/CompanyDetail/CompanyDetail';
import ProjectDetail from './pages/Recruit/Project/ProjectDetail/ProjectDetail';
import AnnounceDetail from './pages/Announce/AnnounceDetail/AnnounceDetail';
import FreeSearch from './pages/Free/FreeSearch';
import QuestionSearch from './pages/Question/QuestionSearch';

const RouteWithNavFooter = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/free" element={<Free />} />
        <Route path="/my-page/card" element={<Mypage />} />
        <Route path="/question" element={<Question />} />
        <Route path="/recruit-study" element={<Study />} />
        <Route path="/recruit-project" element={<Project />} />
        <Route path="/recruit-company" element={<Company />} />
        <Route path="/announce" element={<Announce />} />
        <Route path="/write" element={<Write />} />
        <Route path="/write/free" element={<WriteFree />} />
        <Route path="/write/question" element={<WriteQuestion />} />
        <Route path="/write/recruit/study" element={<WriteStudy />} />
        <Route path="/write/recruit/company" element={<WriteCompany />} />
        <Route path="/write/recruit/project" element={<WriteProject />} />
        <Route path="/my-page/my-like" element={<MypageMylike />} />
        <Route path="/my-page/my-comment" element={<MypageMycomment />} />
        <Route path="/my-page/update" element={<MypageUpdate />} />
        <Route path="/my-page/my-post" element={<MypageMypost />} />
        <Route path="/free-detail/:id" element={<FreeDetail />} />
        <Route path="/question-detail/:id" element={<QuestionDetail />} />
        <Route path="/study-detail/:id" element={<StudyDetail />} />
        <Route path="/project-detail/:id" element={<ProjectDetail />} />
        <Route path="/company-detail/:id" element={<CompanyDetail />} />
        <Route path="/announce-detail/:id" element={<AnnounceDetail />} />
        <Route path="/free/search" element={<FreeSearch />} />
        <Route path="/question/search" element={<QuestionSearch />} />
      </Routes>
    </>
  );
};

export default RouteWithNavFooter;
