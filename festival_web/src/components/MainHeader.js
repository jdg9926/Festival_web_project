import { Link } from "react-router-dom";

export default function MainHeader({ isAuthenticated, isAdmin, username, onLogout }) {
    return (
        <header style={{ padding: "12px 16px", borderBottom: "1px solid #eee", display: "flex", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <Link to="/overview" style={{ fontWeight: 800, fontSize: 18, textDecoration: "none", color: "#111" }}>
                    세상축제
                </Link>
                <nav style={{ display: "flex", gap: 12 }}>
                    <Link to="/overview" style={{ textDecoration: "none", color: "#333" }}>한눈에 보기</Link>
                    {isAuthenticated && !isAdmin && (
                        <Link to="/mypage" style={{ textDecoration: "none", color: "#333" }}>마이페이지</Link>
                    )}
                    {isAuthenticated && isAdmin && (
                        <Link to="/admin" style={{ textDecoration: "none", color: "#333" }}>관리자</Link>
                    )}
                </nav>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {isAuthenticated ? (
                    <>
                        <span style={{ color: "#666" }}>{username}님</span>
                        <button onClick={onLogout} style={{ height: 32, padding: "0 10px", borderRadius: 8, border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}>
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ textDecoration: "none", color: "#333" }}>로그인</Link>
                        <Link to="/register" style={{ textDecoration: "none", color: "#333" }}>회원가입</Link>
                    </>
                )}
            </div>
        </header>
    );
}
