import React from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function About({title, description, team}) {
    return (
        <>
            <Head title={title} />
            <GuestLayout>
                <div className="max-w-4xl mx-auto py-12 px-4">
                    <h1 className="text-3xl font-bold mb-4">{title}</h1>
                    <p className="mb-8">{description}</p>
                    
                    <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {team.map((member, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow">
                                <h3 className="font-semibold">{member.name}</h3>
                                <p className="text-gray-600">{member.position}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </GuestLayout>
        </>
    );
}