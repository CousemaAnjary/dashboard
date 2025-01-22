// "use server"
// import bcrypt from "bcrypt"
// // import { v4 as uuidv4 } from "uuid"
// import { prisma } from "@/src/lib/prisma"
// import { NextRequest, NextResponse } from "next/server"
// import { loginSchema } from "@/src/lib/validations/auth"
// import { createSession } from "@/src/lib/sessions"

// export async function POST(request: NextRequest) {
//     try {
//         // Récupérer et valider les données envoyées
//         const body = await request.json();
//         const validated = loginSchema.parse(body);

//         // Chercher l'utilisateur dans la base de données
//         const user = await prisma.user.findUnique({
//             where: { email: validated.email },
//         });

//         // Vérifier si l'utilisateur existe
//         if (!user) {
//             return NextResponse.json(
//                 { success: false, message: "Email ou mot de passe incorrect." },
//                 { status: 401 }
//             );
//         }

//         // Vérifier le mot de passe
//         const isPasswordValid = await bcrypt.compare(validated.password, user.password || "");

//         if (!isPasswordValid) {
//             return NextResponse.json(
//                 { success: false, message: "Email ou mot de passe incorrect." },
//                 { status: 401 }
//             );
//         }

//         // Créer une session pour l'utilisateur
//         await createSession(user.id);

//         // Retourner une réponse réussie
//         return NextResponse.json(
//             { success: true, message: "Connexion réussie." },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error("Erreur lors du traitement de la requête :", error);

//         // Gérer les erreurs internes
//         return NextResponse.json(
//             { success: false, message: "Erreur interne du serveur." },
//             { status: 500 }
//         );
//     }
// }

