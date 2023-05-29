import { useForm, SubmitHandler } from 'react-hook-form';
import { classNamesFunc } from 'classnames-generics';
import { RouteLocation } from '@/router/routes';
import { Link } from 'react-router-dom';
import BaseInput from '../BaseInput';
import styles from './ContactList.module.scss';

const classNames = classNamesFunc<keyof typeof styles>();

type PhoneFormValues = {
  phoneNumber: string;
};

type Props = {
  contactList: string[];
  openedContact?: string;
  addContact: (contact: string) => void;
};

export default function ContactList({
  contactList,
  addContact,
  openedContact,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PhoneFormValues>();

  const onSubmit: SubmitHandler<PhoneFormValues> = (formValues) => {
    const contact = formValues.phoneNumber + '@c.us';
    if (contactList.includes(contact)) return;
    addContact(contact);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          {...register('phoneNumber', {
            required: true,
            pattern: {
              value: /^\d{11}$/,
              message: 'Номер телефона должен быть в формате: 00000000000',
            },
          })}
          className={styles['add-input']}
          type='text'
          placeholder='Введите номер телефона'
        />
        {errors.phoneNumber?.message && <p>{errors.phoneNumber.message}</p>}
      </form>
      <ul className={styles['contact-list']}>
        {contactList.map((contact) => (
          <li key={contact}>
            <Link
              className={classNames(styles['contact-link'], {
                [styles['active-link']]: openedContact === contact,
              })}
              to={RouteLocation.getChatPage(contact)}
            >
              {contact}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
