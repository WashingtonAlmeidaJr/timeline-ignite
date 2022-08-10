import { HTMLAttributes } from "react";
import styles from "./Avatar.module.css";

interface AvatarProps extends HTMLAttributes<HTMLImageElement> {
//o HTMLAttributes substitui a declaração na interface de propriedades que já tem na tag <img> naturalmente como (src, alt, etc)
hasBorder?: boolean; //O "?" sinaliza que a propriedade é opcional
src:string
}

export function Avatar({ hasBorder = true,src,...props }: AvatarProps) { //O "..." tem o nome de rest operator, é um objeto que importa todas as outras propriedades do AvarProps que não são a hasBorder
return (
<img
    className={hasBorder ? styles.avatarWithBorder : styles.avatar}
    src={src}
    {...props} //usei o rest operator para declarar todas as proriedades restantes (src, alt, etc)
/>
    );
}
