/*
 * ZenSquare is an opensource forums
 *
 * Copyright (C) 2023  Enaium
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

export default {
  view: {
    login: {
      username: {
        label: "Nom d'utilisateur",
        message: "Veuillez saisir votre nom d'utilisateur"
      },
      password: {
        label: "Mot de passe",
        message: "Veuillez saisir votre mot de passe"
      },
      login: "Connexion",
      success: "Connexion réussie"
    },
    register: {
      confirmPassword: "Veuillez saisir votre mot de passe à nouveau",
      passwordDifferent: "Le mot de passe saisi est différent du mot de passe de confirmation",
      register: "S'inscrire",
      success: "Inscription réussie"
    },
    modifyProfile: {
      nickname: { label: "Surnom", message: "Veuillez saisir votre surnom" },
      birthday: { label: "Anniversaire" },
      location: { label: "Emplacement" },
      website: { label: "Site Web" },
      description: { label: "Description" },
      github: { label: "GitHub" },
      bilibili: { label: "BiliBili" },
      email: { label: "Email" }
    },
    visitorMenu: {
      role: "Rôle",
      thread: "Fil",
      reply: "Répondre",
      accountDetails: "Détails du compte",
      followers: "Suiveurs",
      followings: "Suivis",
      security: "Mot de passe et sécurité",
      logout: "Se déconnecter",
      logoutConfirm: "Êtes-vous sûr de vouloir vous déconnecter?",
      logoutSuccess: "Déconnexion réussie"
    },
    forum: {
      newPost: "Nouveau message",
      newThread: "Nouveau fil"
    },
    profile: {
      profile: "Profil",
      startConversation: "Commencer une conversation",
      find: "Trouver",
      modify: "Modifier"
    },
    follow: {
      followers: "Suiveurs",
      followings: "Suivis"
    },
    conversation: {
      member: {
        label: "Membre",
        message: "Veuillez sélectionner un membre"
      },
      title: {
        label: "Titre",
        message: "Veuillez saisir le titre"
      },
      content: {
        label: "Contenu",
        message: "Veuillez saisir le contenu"
      }
    }
  },
  component: {
    state: {
      login: "Connexion",
      register: "S'inscrire",
      profile: "Profil",
      createProfile: "Créer un profil"
    },
    menu: {
      forums: "Forums",
      whatsNew: "Quoi de neuf",
      members: "Membres"
    },
    threadForm: {
      title: {
        label: "Titre",
        message: "Veuillez saisir le titre"
      },
      content: {
        label: "Contenu",
        message: "Veuillez saisir le contenu"
      }
    },
    replyForm: {
      replyForm: {
        label: "Répondre",
        message: "Veuillez saisir le contenu"
      }
    },
    replyList: {
      viewChild: "Voir les enfants ({count})"
    },
    followButton: {
      follow: "Suivre",
      unfollow: "Ne plus suivre"
    },
    reportForm: {
      reason: {
        label: "Raison",
        message: "Veuillez saisir la raison"
      }
    },
    button: {
      report: "Rapport",
      edit: "Modifier",
      reply: "Répondre",
      delete: "Supprimer"
    }
  },
  common: {
    submit: "Soumettre",
    success: "Succès",
    notLogin: "Veuillez d'abord vous connecter pour continuer"
  }
}
