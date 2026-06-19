export const ClaimReq = {
  adminOnly: (c: any) => c.role === 'Admin',
  adminOrTeacher: (c: any) => c.role === 'Admin' || c.role === 'Teacher',
  hasLibraryId: (c: any) => 'LibraryId' in c,
  femaleAndTeacher: (c: any) => c.Gender === 'Female' && c.role === 'Teacher',
  femaleAndUnder10: (c: any) => c.Gender === 'Female' && parseInt(c.DOB) < 10,
}
