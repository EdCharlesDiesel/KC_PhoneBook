using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KCPhoneBook.Entities
{
    [Table("Contacts")]
    public class Person
    {
        [Key]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [MaxLength(200)]
        public string Title { get; set; }

        [MaxLength(200)]
        [Required]
        public string FirstName { get; set; }
        [MaxLength(200)]
        [Required]
        public string LastName { get; set; }
        [EmailAddress]        
        public string Email { get; set; }
        [MaxLength(200)]        
        public string Address { get; set; }

        [MaxLength(20)]        
        [Required]
        public int HomeNumber { get; set; }
        
        
        public int WorkNumber { get; set; }
    }
}
