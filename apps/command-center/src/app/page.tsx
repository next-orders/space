import { redirect } from 'next/navigation';
import { GetEmployeeAccessPayload } from '../server/actions';

export default async function Page() {
  let isLoggedIn = false;

  try {
    const employeePayload = await GetEmployeeAccessPayload();
    isLoggedIn = !!employeePayload.user;
  } catch (err) {
    // No Auth?
  }

  if (isLoggedIn) return redirect('/dashboard');

  return redirect('/auth/login');
}
