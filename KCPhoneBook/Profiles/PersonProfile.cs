using AutoMapper;
using KCPhoneBook.Entities;
using KCPhoneBook.Models;

namespace KCPhoneBook.Profiles
{
    public class PersonProfile : Profile
    {
        public PersonProfile()
        {

            CreateMap<Person, PersonDto>().ReverseMap();
            CreateMap<PersonForCreationDto, Person>();
            CreateMap< PersonForUpdateDto,Person>().ReverseMap();
        }
    }
}
