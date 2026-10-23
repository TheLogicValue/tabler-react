import * as React from "react";
import Media, { type MediaObjectProps } from "../../src/components/Media";
import SocialNetworksList, { type SocialNetworkItem } from "../../src/components/SocialNetworksList";
import Profile, { type ProfileProps } from "../../src/components/Profile";
import Comment from "../../src/components/Comment";
import CommentsCard from "../../src/components/CommentsCard";
import FormWithSingleInputAndButton from "../../src/forms/FormWithSingleInputAndButton.react";
import withTouchedErrors, { type TouchedErrorsProps } from "../../src/helpers/withTouchedErrors.react";

const object: MediaObjectProps = { avatar: true, objectURL: "/avatar.svg", size: "lg", rounded: true, alt: "Equipo" };
<Media className="consumer"><Media.Object {...object} /><Media.Body>
  <Media.Heading>Equipo</Media.Heading>
  <Media.List><Media.ListItem>Elemento</Media.ListItem></Media.List>
</Media.Body></Media>;
<Media.BodySocial name="Ana" workTitle="Revisión" facebook="legacy" twitter="legacy" phone="legacy" skype="legacy">Biografía</Media.BodySocial>;
const socials: ReadonlyArray<SocialNetworkItem> = [{ name: "mail", to: "mailto:equipo@example.com", tooltip: "Contacto" }];
<SocialNetworksList itemsObjects={socials} prefix="fe" />;
<SocialNetworksList items={[<a key="a" href="/equipo">Equipo</a>]} />;
<SocialNetworksList asButtons itemsObjects={[{ name: "twitter", label: "Seguir", color: "blue" }]} />;
const profile: ProfileProps = { name: "Ana", avatarURL: "/avatar.svg", backgroundURL: "/background.svg", bio: "Equipo", twitterURL: "/legacy" };
<Profile {...profile}><span>Biografía alternativa</span></Profile>;
<Profile.Image avatarURL="/avatar.svg" />;
<Comment name="Ana" date="Ahora" text="Revisado" replies={<Comment.Reply name="Luis" text="Correcto" />} />;
<Comment.List><Comment text="Comentario" /></Comment.List>;
<CommentsCard className="consumer" />;
<FormWithSingleInputAndButton formProps={{ method: "post", onSubmit: event => event.preventDefault() }}
  inputProps={{ name: "message", onChange: event => event.currentTarget.value.trim(), onBlur: event => event.currentTarget.focus() }}
  buttonProps={{ RootComponent: "button", type: "submit", onClick: event => event.currentTarget.disabled }} />;
<FormWithSingleInputAndButton inputProps={{ type: "email" }} buttonProps={{ RootComponent: "a", href: "/ayuda", children: "Ayuda" }} />;
<FormWithSingleInputAndButton />;

type EditorProps = TouchedErrorsProps & { readonly label: string; readonly onSubmit: (value: string) => void };
function Editor({ label, errors, touched, onSubmit }: EditorProps) {
  const error: string | undefined = errors?.email;
  const visited: boolean | undefined = touched?.email;
  return <button type="button" onClick={() => onSubmit(error ?? label)}>{String(visited)}</button>;
}
const CheckedEditor = withTouchedErrors(["email"] as const)(Editor);
<CheckedEditor label="Email" onSubmit={value => value.trim()} touched={{ email: true }} errors={{ email: "Revisar", missing: undefined }} />;
<CheckedEditor label="Email" onSubmit={() => undefined} touched={null} errors={null} />;
<CheckedEditor label="Email" onSubmit={() => undefined} />;

// @ts-expect-error The social body requires a name and job title.
<Media.BodySocial />;
// @ts-expect-error Media.Object preserves the five avatar sizes.
<Media.Object size="huge" />;
// @ts-expect-error Media.Body does not forward arbitrary DOM attributes.
<Media.Body id="ignored" />;
// @ts-expect-error A social object requires an icon name.
<SocialNetworksList itemsObjects={[{ to: "/equipo" }]} />;
// @ts-expect-error items is an array rather than a single element.
<SocialNetworksList items={<span>Equipo</span>} />;
// @ts-expect-error Profile's name remains required.
<Profile avatarURL="/avatar.svg" />;
// @ts-expect-error Profile.Image requires its image URL.
<Profile.Image />;
// @ts-expect-error Comments retain their string text prop.
<Comment text={<strong>Comentario</strong>} />;
// @ts-expect-error The legacy card does not expose an onSubmit prop.
<CommentsCard onSubmit={() => undefined} />;
// @ts-expect-error Form.Input callbacks expose an input rather than a button.
<FormWithSingleInputAndButton inputProps={{ onChange: (event: React.ChangeEvent<HTMLButtonElement>) => event.currentTarget.disabled }} />;
// @ts-expect-error Form props do not include uncontrolled custom attributes.
<FormWithSingleInputAndButton formProps={{ id: "ignored" }} />;
// @ts-expect-error The HOC preserves the wrapped component's required props.
<CheckedEditor onSubmit={() => undefined} />;
// @ts-expect-error Errors are text or undefined.
<CheckedEditor label="Email" onSubmit={() => undefined} errors={{ email: 123 }} />;
// @ts-expect-error Touched values are boolean or undefined.
<CheckedEditor label="Email" onSubmit={() => undefined} touched={{ email: "true" }} />;
// @ts-expect-error Field names are strings.
withTouchedErrors([1]);
