using KCPhoneBook.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace KCPhoneBook.Services
{
    public interface IPhoneBookRepository
    {
        Task AddPerson(Person person);
        Task UpdatePerson(Person person);
        void DeletePerson(Person person);
        Task<Person> GetPerson(int Id);        
        Task<IEnumerable<Person>> GetAllPersons();
        Task<bool> PersonExists(int Id);

        Task<bool> SaveAsync();
    }
}