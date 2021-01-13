using KCPhoneBook.DbContexts;
using KCPhoneBook.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KCPhoneBook.Services
{
    public class PhoneBookRepository : IPhoneBookRepository,IDisposable
    {
        private readonly PhoneBookDbContext _context;

        public PhoneBookRepository(PhoneBookDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() >= 0;
        }

        public async Task AddPerson(Person person)
        {
            await _context.Persons.AddAsync(person);
        }

        public void DeletePerson(Person person)
        {
            if (person == null)
            {
                throw new ArgumentNullException(nameof(person));
            }
            _context.Persons.Remove(person);
        }

        public async Task<bool> PersonExists(int Id)
        {
            return await _context.Persons.AnyAsync(t => t.Id == Id);
        }

        public async Task UpdatePerson(Person person)
        {
            // no code in this implementation
        }   


        public async Task<IEnumerable<Person>> GetAllPersons()
        {
            return await _context.Persons.ToListAsync();
        }

        public async Task<Person> GetPerson(int Id)
        {
             if (Id <= 0)
            {
                throw new ArgumentNullException(nameof(Id));
            }

            return await _context.Persons.FirstOrDefaultAsync(a => a.Id == Id);
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                // dispose resources when needed
            }
        } 
        
     }    

}
