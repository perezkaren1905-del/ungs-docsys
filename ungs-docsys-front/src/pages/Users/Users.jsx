import React, { useEffect, useState } from "react";
import Button from "../../components/UI/Button";
import Header from "../../components/UI/Header";
import Navbar from "../../components/UI/Navbar";
import { JwtService } from "../../commons/utils/jwt.service";
import { UsersService } from "../../commons/services/users.service";
import "./Users_module.css";

export default function Users(){
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUserClaim = () => {
        const claims = JwtService.getClaims();
        return {
            name: `${claims.firstName}, ${claims.lastName}`,
            role: `${claims.roles}`
        }
    };
    {/*
        const reclutadores = [
            { id: 1, nombre: "María López", puesto: "RRHH - Colegio Nacional" },
            { id: 2, nombre: "Javier Torres", puesto: "Coordinador de Selección" },
            { id: 3, nombre: "Lucía Fernández", puesto: "Gerente de Talento" },
        ];
    
        const postulantes = [
            { id: 1, nombre: "Ana García", puesto: "Profesora de Matemáticas" },
            { id: 2, nombre: "Carlos Méndez", puesto: "Director de Orquesta" },
            { id: 3, nombre: "Laura Jiménez", puesto: "Coordinadora Académica" },
            { id: 4, nombre: "Pedro Morales", puesto: "Profesor de Historia" },
        ];
    */}

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const rawToken = localStorage.getItem("token");
                if (!rawToken) throw new Error("Token no encontrado");

                // Si el backend espera "Bearer <token>"
                const token = rawToken.startsWith("Bearer ") ? rawToken : `Bearer ${rawToken}`;

                const users = await UsersService.getAll(token);
                setUsuarios(users);
            } catch (err) {
                console.error("Error cargando usuarios:", err);
                setError("No se pudieron cargar los usuarios.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="home-container">
                <Header user={getUserClaim()} />
                <Navbar />
                <div className="usuarios-container">
                <p>Cargando usuarios...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home-container">
                <Header user={getUserClaim()} />
                <Navbar />
                <div className="usuarios-container">
                <p>{error}</p>
                </div>
            </div>
        );
    }

    const reclutadores = usuarios.filter((u) => u.role === "RECRUITER");
    const postulantes = usuarios.filter((u) => u.role === "CANDIDATE");

    return (
        <div className="home-container">
            <Header user={getUserClaim()}/>
            <Navbar />
            <div className="usuarios-container">
                <h2>Panel de Usuarios</h2>
        
                {/* Sección de Reclutadores */}
                <section className="user-section">
                    <h3>Reclutadores ({reclutadores.length})</h3>
                    {reclutadores.length > 0 ? (
                    <ul className="user-list">
                        {reclutadores.map((user) => (
                        <li key={user.id} className="user-item">
                            <div className="user-info">
                            <h4>{user.fullName}</h4>
                            <p>{user.email}</p>
                            </div>
                            <Button variant="approve">
                                Ver Perfil
                            </Button>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p className="empty">No hay reclutadores registrados.</p>
                    )}
                </section>
        
                {/* Sección de Postulantes */}
                <section className="user-section">
                    <h3>Postulantes ({postulantes.length})</h3>
                    {postulantes.length > 0 ? (
                    <ul className="user-list">
                        {postulantes.map((user) => (
                        <li key={user.id} className="user-item">
                            <div className="user-info">
                            <h4>{user.fullName}</h4>
                            <p>{user.email}</p>
                            </div>
                            <Button variant="approve">
                                Ver Perfil
                            </Button>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p className="empty">No hay postulantes registrados.</p>
                    )}
                </section>
            </div>
    </div>
    );
}