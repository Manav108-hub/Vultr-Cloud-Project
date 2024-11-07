import { Activity, Home, LineChart, MessageSquare, User } from 'lucide-react';
import { Link, router, usePage } from '@inertiajs/react';

export default function NavBar({ onLogout }) {
    const user = usePage().props.auth.user;
    const { auth } = usePage().props;
    const isAuthenticated = auth.user !== null;

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-4 md:px-0">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Activity className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-bold text-gray-800">HealthMate</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex space-x-8">
                        <NavLink href="/" icon={<Home className="h-5 w-5" />} text="Home" />
                        {isAuthenticated && (
                            <>
                                <NavLink href="/dashboard" icon={<LineChart className="h-5 w-5" />} text="Dashboard" />
                                <NavLink href="/chat" icon={<MessageSquare className="h-5 w-5" />} text="Chat" />
                                <NavLink href="/profile" icon={<User className="h-5 w-5" />} text="Profile" />
                            </>
                        )}
                    </div>

                    {/* Conditional Buttons */}
                    <div className="flex space-x-4">
                        {isAuthenticated ? (
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Logout
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, icon, text }) {
    return (
        <Link
            href={href}
            className="flex items-center space-x-1 px-3 py-2 rounded-md transition-colors text-gray-600 hover:text-blue-600 hover:bg-blue-50"
        >
            {icon}
            <span>{text}</span>
        </Link>
    );
}
