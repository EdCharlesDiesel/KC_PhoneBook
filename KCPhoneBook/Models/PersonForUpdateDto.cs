using System.ComponentModel.DataAnnotations;

namespace KCPhoneBook.Models
{
    public class PersonForUpdateDto : PersonAbstractBase
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "required|Title is required.")]
        [MaxLength(200, ErrorMessage = "maxLength|First name is too long.")]
        public override string Title { get => base.Title; set => base.Title = value; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "required|First name is required.")]
        [MaxLength(200, ErrorMessage = "maxLength|First name is too long.")]
        public override string FirstName { get => base.FirstName; set => base.FirstName = value; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "required|Last name is required.")]
        [MaxLength(200, ErrorMessage = "maxLength|Last name is too long.")]
        public override string LastName { get => base.LastName; set => base.LastName = value; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "required|Address is required.")]
        [MaxLength(200, ErrorMessage = "maxLength|Address name is too long.")]
        public override string Address { get => base.Address; set => base.Address = value; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "required|Email is required.")]
        [EmailAddress]
        public override string Email { get => base.Email; set => base.Email = value; }

  
        public override int HomeNumber { get; set; }
  
        public override int WorkNumber { get; set; }
    }
}
