import ProfileContainer from "./style";
import { useUserData } from "../../Providers/UserData";
import { useState } from "react";
import PinkButton from "../PinkButton";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import MessageBalloon from "../MessageBalloon";
import api from "../../Services";
import ConfirmationPopup from "../ConfirmationPopup";
import { useHistory } from "react-router-dom";
import { useAuthenticated } from "../../Providers/authentication";


const ProfileCard = () => {
    
    const { userName, userEmail, userId, token, userAvatar } = useUserData();
    
    const [changingProfile, setChangingProfile] = useState(false);
    
    const [deletingProfile, setDeletingProfile] = useState(false);

    const {setAuthenticated} = useAuthenticated();

    const history = useHistory();

    const formSchema = yup.object().shape({
        username: yup.string().required("Usuário inválido").matches("^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$", "Usuário inválido"),
        email: yup.string().required("Email obrigatório!").email("E-mail inválido"),
    });

    const deleteProfile = () => {
        api.delete(`/users/${userId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then ( res => {
            toast.success("Conta excluída!")
            setAuthenticated(false);
            localStorage.clear();
            history.push("/")
        }
        )
    }

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(formSchema)
    });

    const handleCancel = () => {
        document.getElementById("username_input").value = userName;
        document.getElementById("email_input").value = userEmail;
        setChangingProfile(false)
    }

    const onSub = (data) => {
        api.patch(`/users/${userId}/`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        .then(() => {
            setChangingProfile(false);
            toast.success("Sucesso!")
            window.location.reload();
            })
        .catch(() => toast.error("Erro ao atualizar perfil!"))
    }

    return (
        <>
        <ProfileContainer >
            <h1>{userName}</h1>
                <img className = "user_avatar" alt = {userName} src = {userAvatar} />
            { deletingProfile && 
            <ConfirmationPopup >
                <p>Tem certeza?</p>
                A Exclusão da conta é irreversível e você deverá fazer outro cadastro se desejar
                continuar usando nossos serviços. 
                <div>
                    <button className = "yes_button" onClick = {deleteProfile}>Sim</button>
                    <button className = "no_button" onClick = {() => setDeletingProfile(false)}>Não</button>
                </div>
            </ConfirmationPopup>
            }
            <div></div>
            <form className = "profile_card" onSubmit = {handleSubmit(onSub)} noValidate>
                
                    <input id = "username_input" defaultValue = {userName}  type = "text" disabled = {changingProfile? "" : "true"} {...register("username")} 
                    />
                    {changingProfile && errors.username && <MessageBalloon className = "invalid_username_message" message = {errors.username.message} />}
                
                
                    <input id = "email_input" defaultValue = {userEmail} disabled = {changingProfile? "" : "true"} {...register("email")} 
                    />
                    {changingProfile && errors.email && <MessageBalloon className = "invalid_email_message" message = {errors.email.message} />}     
                
                
                <div>
                    {changingProfile? 
                    <div className = "change_profile_buttons">
                    <PinkButton text = "Salvar" type = "submit" />
                    <span className = "fake_button" onClick = {handleCancel}>cancelar</span>
                    </div>
                    :
                    <span className = "fake_button" onClick = {() => setChangingProfile(true)}>Alterar</span>
                }
                </div>
            </form>
        
            <div className = "profile_footer">
                <button className = "delete_button" onClick = {() => setDeletingProfile(true)}>Excluir Conta</button>
            </div>
        </ProfileContainer>
        </>
    )
}

export default ProfileCard;