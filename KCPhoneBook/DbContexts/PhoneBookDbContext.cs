using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using KCPhoneBook.Entities;
using Microsoft.EntityFrameworkCore;

namespace KCPhoneBook.DbContexts
{
    public class PhoneBookDbContext : DbContext
    {
        public DbSet<Person> Persons { get; set; }


        public PhoneBookDbContext(DbContextOptions<PhoneBookDbContext> options)
           : base(options)
        {

        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {

            var addedOrUpdatedEntries = ChangeTracker.Entries()
                    .Where(x => x.State == EntityState.Added || x.State == EntityState.Modified);
            return base.SaveChangesAsync(cancellationToken);
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        // modelBuilder.Entity<Person>().HasData(
        //      new Person
        //      {
        //          Id = 100,
        //          Title = "Mrs",
        //          FirstName = "Khotso",
        //          LastName = "Mokhethi",
        //          Email = "Khotso@Charles.com",
        //          Address = "2450B Zone 9 Meadowlands 1852",
        //          HomeNumber = 1259985856,
        //          WorkNumber = 01236547896
        //      },

        //            new Person
        //            {
        //                Id = 200,
        //                Title = "Mr",
        //                FirstName = "Khotso",
        //                LastName = "Mokhethi",
        //                Email = "Khotso@Charles.com",
        //                Address = "2450B Zone 9 Meadowlands 1852",
        //                HomeNumber = 1259956,
        //                WorkNumber = 01236547896
        //            });

        //}
    }
}

