using System.ComponentModel.DataAnnotations;

namespace KCPhoneBook.Models
{
    public abstract class PersonAbstractBase
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "required|Title is required.")]
        [MaxLength(200, ErrorMessage = "maxLength|Title is too long.")]
        public virtual string Title { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "required|First name is required.")]
        [MaxLength(200, ErrorMessage = "maxLength|First name is too long.")]
        public virtual string FirstName { get; set; }

        [MaxLength(200, ErrorMessage = "maxLength|Last name is too long.")]
        public virtual string LastName { get; set; }

        [EmailAddress]
        public virtual string Email { get; set; }

        [MaxLength(2000, ErrorMessage = "maxLength|Address name is too long.")]
        public virtual string Address { get; set; }
        
        public virtual int HomeNumber { get; set; }        

        public virtual int WorkNumber { get; set; }
    }
}
